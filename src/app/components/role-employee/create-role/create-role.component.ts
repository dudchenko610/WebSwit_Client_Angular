import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { CreateRoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/create-role-employee.model";
import { CreateRoleEmployeeAction } from "../store/actions/role-employee.action";

@Component({
    selector: "app-create-role",
    templateUrl: "./create-role.component.html",
    styleUrls: ["./create-role.component.scss"]
})
export class CreateRoleComponent implements OnInit {
    public createModel: CreateRoleEmployeeModel;
    constructor(
        private $store: Store,
        public dialogRef: MatDialogRef<CreateRoleComponent>
    ) {
        this.createModel = new CreateRoleEmployeeModel();
    }

    ngOnInit(): void {}

    create() {
        this.$store.dispatch(new CreateRoleEmployeeAction(this.createModel));
        this.cancel();
    }

    cancel() {
        this.dialogRef.close();
    }
}
