import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { SignOutAction } from "src/app/components/account/store/actions/auth.action";
import { EstablishSignalRConnectionAction } from "../signal-r.actions";

@Component({
    selector: "app-connection-establish-error",
    templateUrl: "./connection-establish-error.component.html",
    styleUrls: ["./connection-establish-error.component.scss"]
})
export class ConnectionEstablishErrorComponent implements OnInit {
    constructor(
        private $store: Store,
        public readonly dialogRef: MatDialogRef<ConnectionEstablishErrorComponent>
    ) {}

    ngOnInit(): void {}

    public tryAgain(): void {
        this.$store.dispatch(new EstablishSignalRConnectionAction());
        this.dialogRef.close();
    }

    public signOut(): void {
        this.$store.dispatch(new SignOutAction());
        this.dialogRef.close();
    }
}
