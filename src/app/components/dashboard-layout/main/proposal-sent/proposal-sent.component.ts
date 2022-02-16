import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "proposal-sent",
    templateUrl: "./proposal-sent.component.html",
    styleUrls: ["./proposal-sent.component.scss"]
})
export class ProposalSentComponent implements OnInit {

    constructor(public readonly dialogRef: MatDialogRef<ProposalSentComponent>) {

    }

    ngOnInit(): void {

    }

    public onCloseDialog() {
        this.dialogRef.close();
    }

}