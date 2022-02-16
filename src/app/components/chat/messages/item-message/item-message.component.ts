import { Component, Input, OnDestroy, OnInit, Type } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProfileState } from "src/app/components/account/store/state/profile.state";
import { MessageStateModel } from "src/app/shared/models/view-models/chat/messages/message-state.model";
import { MessageModel } from "src/app/shared/models/view-models/chat/messages/message.model";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { ItemMessageLoaderComponent } from "../item-message-loader/item-message-loader.component";

@Component({
    selector: "app-item-message",
    templateUrl: "./item-message.component.html",
    styleUrls: ["./item-message.component.scss"]
})
export class ItemMessageComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(ProfileState.getUser)
    meUserObservable: Observable<UserModel>;

    messageState: MessageStateModel;
    @Input() message: MessageModel;

    public componentType: Type<any> = ItemMessageLoaderComponent;

    constructor() {}

    ngOnInit(): void {
        this.meUserObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((meUser) => {
                if (this.message.states.length && meUser && this.message.authorUserId == meUser.id) {
                    this.messageState =
                        this.message.states[0].userId == meUser.id
                            ? this.message.states[1]
                            : this.message.states[0];
                }
            });
    }

    ngOnDestroy(): void {}

    public getTime(message: MessageModel): string {
        const date = new Date(message.lastUpdate);
        return date.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");
    }
}
