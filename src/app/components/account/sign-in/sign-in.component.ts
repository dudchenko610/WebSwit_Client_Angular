import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { SignInModel } from "src/app/shared/models/view-models/account/sign-in.model";
import { SignInAction, SignOutAction } from "../store/actions/auth.action";

@Component({
    selector: "app-sign-in",
    templateUrl: "./sign-in.component.html",
    styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
    loginModel: SignInModel;

    constructor(private _store: Store) {
        this.loginModel = new SignInModel();
    }

    ngOnInit(): void {}

    public signIn() {
        this._store.dispatch(new SignInAction(this.loginModel));
    }

    public signOut() {
        this._store.dispatch(new SignOutAction());
    }
}
