import {
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild
} from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProfileState } from "src/app/components/account/store/state/profile.state";
import { ContactModel } from "src/app/shared/models/view-models/chat/contacts/contact.model";
import { MessageModel } from "src/app/shared/models/view-models/chat/messages/message.model";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { GetFilteredMessagesAction } from "../../store/actions/message.action";
import { ContactState } from "../../store/states/contact.state";
import {
    MessageState,
    MessageStateModel
} from "../../store/states/message.state";

@Component({
    selector: "app-list-messages",
    templateUrl: "./list-messages.component.html",
    styleUrls: ["./list-messages.component.scss"]
})
export class ListMessagesComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    private static MessageItemHeight: number = 40;

    @ViewChild("messagesContainer") messagesContainer: ElementRef;

    @Select(ProfileState.getUser)
    meUserObservable: Observable<UserModel>;
    meUser: UserModel;

    @Select(MessageState.getState)
    messagesStateObservable: Observable<MessageStateModel>;

    messages: MessageModel[] = [];
    hasMore: boolean = false;

    @Select(ContactState.getCurrentContact)
    currentContactObservable: Observable<ContactModel>;
    currentContact: ContactModel;

    constructor(private $store: Store) {}

    ngOnInit(): void {
        this.messagesStateObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((state: MessageStateModel) => {
                this.messages = state.messages;
                this.hasMore = state.hasMore;

                // start checking on complete message filling
                if (
                    this.messages.length &&
                    this.hasMore &&
                    this.messages.length *
                        ListMessagesComponent.MessageItemHeight <
                        this.messagesContainer.nativeElement.offsetHeight
                ) {
                    this.$store.dispatch(
                        new GetFilteredMessagesAction(
                            {
                                lastId: this.messages[this.messages.length - 1].id,
                                count: 10
                            },
                            { oppositeUserId: this.currentContact.user.id }
                        )
                    );
                }
            });

        this.meUserObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((meUser) => {
                this.meUser = meUser;
            });

        this.currentContactObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((currentContact) => {
                this.currentContact = currentContact;
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostListener("scroll", ["$event"])
    onScroll(event: any) {
        if (
            event.target.offsetHeight - event.target.scrollTop >=
            event.target.scrollHeight
        ) {
            if (this.hasMore) {
                this.$store.dispatch(
                    new GetFilteredMessagesAction(
                        {
                            lastId: this.messages[this.messages.length - 1].id,
                            count: 10
                        },
                        { oppositeUserId: this.currentContact.user.id }
                    )
                );
            }
        }
    }
}
