import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { SignOutAction } from "../../store/actions/auth.action";
import { GetProfileAction } from "../../store/actions/profile.action";

@Component({
    selector: "app-getting-error-profile",
    templateUrl: "./getting-error-profile.component.html",
    styleUrls: ["./getting-error-profile.component.scss"]
})
export class GettingErrorProfileComponent implements OnInit {
    constructor(
        private $store: Store,
        public readonly dialogRef: MatDialogRef<GettingErrorProfileComponent>
    ) {}

    ngOnInit(): void {}

    public reload(): void {
        this.$store.dispatch(new GetProfileAction());
        this.dialogRef.close();
    }

    public signOut(): void {
        this.$store.dispatch(new SignOutAction());
        this.dialogRef.close();
    }
}
