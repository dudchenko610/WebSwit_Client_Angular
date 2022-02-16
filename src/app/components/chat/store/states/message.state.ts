import { Injectable } from "@angular/core";
import { State, Action, Store, StateContext, Selector } from "@ngxs/store";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { patch, updateItem } from "@ngxs/store/operators";
import { SignOutAction } from "src/app/components/account/store/actions/auth.action";
import { MessageService } from "src/app/services/chat/message.service";
import { PageListResponseModel } from "src/app/shared/models/common/list-page/page-list-response.model";
import { MessageSentModel } from "src/app/shared/models/view-models/chat/messages/message-sent.model";
import { MessageModel } from "src/app/shared/models/view-models/chat/messages/message.model";
import { MessagesReadResponseModel } from "src/app/shared/models/view-models/chat/messages/messages-read-response.model";
import {
    ClearMessagesAction,
    GetFilteredMessagesAction,
    GetInitialFilteredMessagesAction,
    MessageCameAction,
    OppositeUserReadMessagesAction,
    ReadMessagesAction,
    SendMessageAction
} from "../actions/message.action";
import { ContactState } from "./contact.state";
import { updateManyItems } from "src/app/shared/plugins/ngxs-operators/update-many-items.operator";

export class MessageStateModel {
    messages: MessageModel[];
    hasMore: boolean;
    isRequestSent: boolean;
}

@State<MessageStateModel>({
    name: "message",
    defaults: {
        messages: [],
        hasMore: false,
        isRequestSent: false
    }
})
@Injectable()
export class MessageState {
    constructor(
        private $store: Store,
        private messageService: MessageService
    ) {}

    @Selector()
    static getMessages(state: MessageStateModel) {
        return state.messages;
    }

    @Selector()
    static getHasMore(state: MessageStateModel) {
        return state.hasMore;
    }

    @Selector()
    static getState(state: MessageStateModel) {
        return state;
    }

    @Action(GetInitialFilteredMessagesAction)
    getFilteredInitial(context: StateContext<MessageStateModel>, action) {
        return this.getFilteredData(context, action);
    }

    @Action(GetFilteredMessagesAction)
    getFiltered(context: StateContext<MessageStateModel>, action) {
        const state = context.getState();
        let res = null;

        if (!state.isRequestSent) {
            res = this.getFilteredData(context, action);

            context.setState({
                ...context.getState(),
                isRequestSent: true
            });
        }

        return res;
    }

    private getFilteredData(
        { getState, setState }: StateContext<MessageStateModel>,
        { payload, filter }
    ) {
        const currentContactCounterBeforeGetting = this.$store.selectSnapshot(
            ContactState.getCurrentContactCounter
        );

        return this.messageService.getFiltered(payload, filter).pipe(
            tap((result: PageListResponseModel<MessageModel>) => {
                const currentContactCounter = this.$store.selectSnapshot(
                    ContactState.getCurrentContactCounter
                );

                const currentContact = this.$store.selectSnapshot(
                    ContactState.getCurrentContact
                );

                if (
                    currentContactCounterBeforeGetting == currentContactCounter
                ) {
                    if (result.data && result.data.length && currentContact) {
                        const state = getState();

                        setState({
                            ...state,
                            messages: [...state.messages, ...result.data],
                            hasMore: result.hasMore,
                            isRequestSent: false
                        });
                        
                        this.$store.dispatch(
                            new ReadMessagesAction({
                                authorUserId: currentContact.user.id,
                                messagesIds: result.data.map((x: MessageModel) => x.id)
                            })
                        );
                    }
                }
            }),
            catchError((error) => {
                const currentContactCounter = this.$store.selectSnapshot(
                    ContactState.getCurrentContactCounter
                );

                if (
                    currentContactCounterBeforeGetting == currentContactCounter
                ) {
                    setState({
                        ...getState(),
                        isRequestSent: true
                    });
                }

                return of(0);
            })
        );
    }

    @Action(ClearMessagesAction)
    clear(
        { getState, setState }: StateContext<MessageStateModel>,
        {}: ClearMessagesAction
    ) {
        const state = getState();

        setState({
            ...state,
            messages: [],
            hasMore: false,
            isRequestSent: false
        });
    }

    @Action(SendMessageAction)
    send(
        { getState, setState }: StateContext<MessageStateModel>,
        { payload }: SendMessageAction
    ) {
        const state = getState();

        setState({
            ...state,
            messages: [payload, ...state.messages]
        });

        return this.messageService.send(payload).pipe(
            tap((result: MessageSentModel) => {
                setState(
                    patch({
                        messages: updateItem(
                            (x: MessageModel) =>
                                x.lastUpdate == payload.lastUpdate,
                            patch({
                                id: result.messageId
                                // lastUpdate: result.lastUpdate
                            })
                        )
                    })
                );
            })
        );
    }

    @Action(MessageCameAction)
    onCame(
        { getState, setState }: StateContext<MessageStateModel>,
        { payload }: MessageCameAction
    ) {
        const state = getState();
        const contacts = this.$store.selectSnapshot(ContactState.getContacts);

        const authorContact = contacts.find(
            (x) => x.user.id == payload.message.authorUserId
        );

        console.log('MESSAGE CAME ACTION');

        const currentContact = this.$store.selectSnapshot(
            ContactState.getCurrentContact
        );

        if (
            authorContact &&
            currentContact &&
            currentContact.user.id == authorContact.user.id
        ) {
            setState({
                ...state,
                messages: [payload.message, ...state.messages]
            });

            console.log('DISPATCH READ MESSSGE ON CAME')
            console.log(new ReadMessagesAction({
                authorUserId: payload.message.authorUserId,
                messagesIds: [payload.message.id]
            }));
            console.log(currentContact.user.id)

            this.$store.dispatch(
                new ReadMessagesAction({
                    authorUserId: payload.message.authorUserId,
                    messagesIds: [payload.message.id]
                })
            );
        }
    }

    @Action(OppositeUserReadMessagesAction)
    onOppositeRead(
        { setState }: StateContext<MessageStateModel>,
        { payload }: OppositeUserReadMessagesAction
    ) {
        console.log("OPPOSITE USER READ MESSAGES");

        const currentContact = this.$store.selectSnapshot(
            ContactState.getCurrentContact
        );

        if (currentContact && currentContact.user.id == payload.readerUserId) {
            setState(
                patch({
                    messages: updateManyItems(
                        (x: MessageModel) => payload.messagesIds.includes(x.id),
                        patch({
                            states: updateItem(
                                (y: any) => y.userId == payload.readerUserId,
                                patch({
                                    isRead: true
                                })
                            )
                        })
                    )
                })
            );
        }
    }

    @Action(SignOutAction)
    signOut({ setState }: StateContext<MessageStateModel>) {
        setState({
            messages: [],
            hasMore: false,
            isRequestSent: false
        });
    }
}
