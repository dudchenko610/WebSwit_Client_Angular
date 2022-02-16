import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { SignUpModel } from "src/app/shared/models/view-models/account/sign-up.model";
import { SignUpAction } from "../store/actions/auth.action";

@Component({
    selector: "app-sign-up",
    templateUrl: "./sign-up.component.html",
    styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
    public signUpModel: SignUpModel;

    constructor(private _store: Store) {
        this.signUpModel = new SignUpModel();
    }

    ngOnInit(): void {}

    public signUp(): void {
        if (this.signUpModel.password !== this.signUpModel.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        this._store.dispatch(new SignUpAction(this.signUpModel));
    }
}
