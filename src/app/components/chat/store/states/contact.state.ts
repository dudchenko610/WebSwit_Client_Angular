import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { State, Store, Action, StateContext, Selector } from "@ngxs/store";
import { patch, updateItem } from "@ngxs/store/operators";
import { tap } from "rxjs/operators";
import { SignOutAction } from "src/app/components/account/store/actions/auth.action";
import { ContactService } from "src/app/services/chat/contact.service";
import { MessageService } from "src/app/services/chat/message.service";
import { UserPictureService } from "src/app/services/user-picture/user-picture.service";
import { ContactModel } from "src/app/shared/models/view-models/chat/contacts/contact.model";
import { MessagesReadResponseModel } from "src/app/shared/models/view-models/chat/messages/messages-read-response.model";
import {
    GetAllContactsAction,
    GetContactAction,
    GetContactPictureAction,
    PickContactAction
} from "../actions/contact.action";
import {
    ClearMessagesAction,
    GetInitialFilteredMessagesAction,
    MessageCameAction,
    ReadMessagesAction,
    SendMessageAction
} from "../actions/message.action";

// RENAME all opposite to receiver to be the same
export class ContactStateModel {
    contacts: ContactModel[];
    currentContact: ContactModel;
    pickContactCounter: number;
    totalUnreadMessages: number;
}

@State<ContactStateModel>({
    name: "contact",
    defaults: {
        contacts: [],
        currentContact: null,
        pickContactCounter: 0,
        totalUnreadMessages: 0
    }
})
@Injectable()
export class ContactState {
    constructor(
        private $store: Store,
        private contactService: ContactService,
        private messageService: MessageService,
        private userPictureService: UserPictureService,
        private sanitizer: DomSanitizer
    ) {}

    @Selector()
    static getCurrentContact(state: ContactStateModel) {
        return state.currentContact;
    }

    @Selector()
    static getContacts(state: ContactStateModel) {
        return state.contacts;
    }

    @Selector()
    static getCurrentContactCounter(state: ContactStateModel) {
        return state.pickContactCounter;
    }

    @Action(PickContactAction)
    pick(
        { getState, setState }: StateContext<ContactStateModel>,
        { user }: PickContactAction
    ) {
        const state = getState();

        if (state.currentContact && state.currentContact.user.id == user.id) {
            // clear messages
            setState({
                ...state,
                currentContact: null,
                pickContactCounter: state.pickContactCounter + 1
            });

            this.$store.dispatch(new ClearMessagesAction());

            return;
        }

        let contact: ContactModel = state.contacts.find(
            (x) => x.user.id == user.id
        );

        let constants: ContactModel[] = state.contacts;

        if (!contact) {
            // add to list
            const millisecondsSince1970: number = state.contacts.length
                ? state.contacts[state.contacts.length - 1]
                      .millisecondsSince1970
                : new Date("Jan 1, 70 00:00:00 GMT+00:00").getTime();

            contact = {
                user: user,
                unreadCount: 0,
                millisecondsSince1970: millisecondsSince1970
            };

            this.$store.dispatch(new GetContactPictureAction(user.id));

            constants = [...constants, contact];
        }

        setState({
            ...state,
            contacts: [...constants],
            currentContact: contact,
            pickContactCounter: state.pickContactCounter + 1
        });

        this.$store.dispatch(new ClearMessagesAction());
        this.$store.dispatch(
            new GetInitialFilteredMessagesAction(
                { lastId: null, count: 10 },
                { oppositeUserId: contact.user.id }
            )
        );
    }

    @Action(GetContactPictureAction)
    getByIdPicture(
        { setState }: StateContext<ContactStateModel>,
        { payload }: GetContactPictureAction
    ) {
        return this.userPictureService.get(payload).pipe(
            tap((result: Blob) => {
                setState(
                    patch({
                        contacts: updateItem(
                            (x: ContactModel) => x.user.id == payload,
                            patch({
                                user: patch({
                                    file: this.sanitizer.bypassSecurityTrustUrl(
                                        URL.createObjectURL(result)
                                    )
                                })
                            })
                        )
                    })
                );
            })
        );
    }

    @Action(GetAllContactsAction)
    getAll(
        { getState, setState }: StateContext<ContactStateModel>,
        _: GetAllContactsAction
    ) {
        return this.contactService.getAll().pipe(
            tap((result: Array<ContactModel>) => {
                const state = getState();

                result.forEach((x: ContactModel) => {
                    if (x.user.pictureName) {
                        this.$store.dispatch(
                            new GetContactPictureAction(x.user.id)
                        );
                    }
                });

                result.sort(function (a, b) {
                    return b.millisecondsSince1970 - a.millisecondsSince1970;
                });

                setState({
                    ...state,
                    contacts: [...result],
                    currentContact: null
                });
            })
        );
    }

    @Action(GetContactAction)
    get(
        { getState, setState }: StateContext<ContactStateModel>,
        { payload }: GetContactAction
    ) {
        return this.contactService.getById(payload).pipe(
            tap((result: ContactModel) => {
                const state = getState();
                const contacts: ContactModel[] = [...state.contacts, result];

                contacts.sort(function (a, b) {
                    return b.millisecondsSince1970 - a.millisecondsSince1970;
                });

                setState({
                    ...state,
                    contacts: contacts
                });

                if (result.user.pictureName) {
                    this.$store.dispatch(
                        new GetContactPictureAction(result.user.id)
                    );
                }
            })
        );
    }

    @Action(SendMessageAction)
    send(
        { getState, setState }: StateContext<ContactStateModel>,
        { payload }: SendMessageAction
    ) {
        const state = getState();

        if (state.currentContact.user.id == payload.receiverUserId) {
            const contacts = [
                ...state.contacts.filter(
                    (x) => x.user.id != payload.receiverUserId
                )
            ];

            const receiverContact = {
                ...state.contacts.find(
                    (x) => x.user.id == payload.receiverUserId
                ),
                millisecondsSince1970: Date.now()
            };
            contacts.push(receiverContact);

            contacts.sort(function (a, b) {
                return b.millisecondsSince1970 - a.millisecondsSince1970;
            });

            setState({
                ...state,
                contacts: contacts,
                currentContact: receiverContact
            });
        }
    }

    @Action(MessageCameAction)
    onCame(
        { getState, setState }: StateContext<ContactStateModel>,
        { payload }: MessageCameAction
    ) {
        const state = getState();
        const authorContact = state.contacts.find(
            (x) => x.user.id == payload.message.authorUserId
        );

        if (authorContact) {
            if (
                !(
                    state.currentContact &&
                    state.currentContact.user.id == authorContact.user.id
                )
            ) {
                // add to unread count of the contact

                const contacts = [
                    ...state.contacts.filter(
                        (x) => x.user.id != payload.message.authorUserId
                    )
                ];
    
                const receiverContact = {
                    ...state.contacts.find(
                        (x) => x.user.id == payload.message.authorUserId
                    ),
                    millisecondsSince1970: Date.now()
                };

                contacts.push({
                    ...receiverContact,
                    unreadCount: receiverContact.unreadCount + 1
                });
    
                contacts.sort(function (a, b) {
                    return b.millisecondsSince1970 - a.millisecondsSince1970;
                });

                setState({
                    ...state,
                    contacts: contacts
                });

                // setState(
                //     patch({
                //         contacts: updateItem(
                //             (x: ContactModel) =>
                //                 x.user.id == payload.message.authorUserId,
                //             patch({
                //                 unreadCount: authorContact.unreadCount + 1
                //             })
                //         )
                //     })
                // );
            }
        } else {
            // There is no such contact yet, so get it from backend
            this.$store.dispatch(
                new GetContactAction(payload.message.authorUserId)
            );
        }
    }

    @Action(ReadMessagesAction)
    read(
        { setState }: StateContext<ContactStateModel>,
        { payload }: ReadMessagesAction
    ) {
        return this.messageService.read(payload).pipe(
            tap((result: MessagesReadResponseModel) => {
                setState(
                    patch({
                        contacts: updateItem(
                            (x: ContactModel) =>
                                x.user.id == payload.authorUserId,
                            patch({
                                unreadCount: result.unreadCount
                            })
                        )
                    })
                );
            })
        );
    }

    // @Action(OppositeUserReadMessagesAction)
    // onOppositeRead(
    //     { getState, setState }: StateContext<ContactStateModel>,
    //     { payload }: OppositeUserReadMessagesAction
    // ) {
    //     console.log("OPPOSITE USER READ MESSAGES in contacts state");
    //     console.log(payload);

    //     setState(
    //         patch({
    //             contacts: updateItem(
    //                 (x: ContactModel) => x.user.id == payload.authorUserId,
    //                 patch({
    //                     unreadCount: payload.unreadCount
    //                 })
    //             )
    //         })
    //     );
    // }

    @Action(SignOutAction)
    signOut({ setState, getState }: StateContext<ContactStateModel>) {
        const state = getState();

        setState({
            contacts: [],
            currentContact: null,
            pickContactCounter: state.pickContactCounter + 1,
            totalUnreadMessages: 0
        });
    }
}
