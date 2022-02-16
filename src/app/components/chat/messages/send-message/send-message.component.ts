import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProfileState } from "src/app/components/account/store/state/profile.state";
import { ContactModel } from "src/app/shared/models/view-models/chat/contacts/contact.model";
import { MessageModel } from "src/app/shared/models/view-models/chat/messages/message.model";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { SendMessageAction } from "../../store/actions/message.action";
import { ContactState } from "../../store/states/contact.state";

@Component({
    selector: "app-send-message",
    templateUrl: "./send-message.component.html",
    styleUrls: ["./send-message.component.scss"]
})
export class SendMessageComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    content: string = "";

    @Select(ContactState.getCurrentContact)
    currentContactObservable: Observable<ContactModel>;
    currentContact: ContactModel;

    @Select(ProfileState.getUser)
    meUserObservable: Observable<UserModel>;
    meUser: UserModel;

    constructor(private $store: Store) {}

    public send(): void {
        const message: MessageModel = {
            id: null,
            authorUserId: this.meUser.id,
            receiverUserId: this.currentContact.user.id,
            content: this.content,
            lastUpdate: new Date().toISOString(),
            states: [
                {
                    userId: this.meUser.id,
                    isRead: true
                },
                {
                    userId: this.currentContact.user.id,
                    isRead: false
                }
            ]
        };

        this.$store.dispatch(new SendMessageAction(message));
    }

    ngOnInit(): void {
        this.currentContactObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((currentContact) => {
                this.currentContact = currentContact;
            });

        this.meUserObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((meUser) => {
                this.meUser = meUser;
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
