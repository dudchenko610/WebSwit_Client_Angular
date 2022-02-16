import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { CreateEmployeeModel } from "src/app/shared/models/view-models/employee/create-employee.model";
import { RoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/role-emploee.model";
import { GetAllRoleEmployeeAction } from "../../role-employee/store/actions/role-employee.action";
import { RoleEmployeeState } from "../../role-employee/store/state/role-employee.state";
import { CreateEmployeeAction } from "../store/actions/employee.action";

@Component({
    selector: "app-create-employee",
    templateUrl: "./create-employee.component.html",
    styleUrls: ["./create-employee.component.scss"]
})
export class CreateEmployeeComponent implements OnInit {

    public createModel: CreateEmployeeModel;
    public roles: RoleEmployeeModel[];

    @Select(RoleEmployeeState.getAll)
    dataObservable: Observable<RoleEmployeeModel[]>;

    constructor(
        private readonly $store: Store,
        public readonly dialogRef: MatDialogRef<CreateEmployeeComponent>
    ) {
        this.createModel = new CreateEmployeeModel();
        this.roles = new Array<RoleEmployeeModel>();
    }

    ngOnInit(): void {
        this.dataObservable.subscribe((roles) => {
            this.roles = roles;
        });

        this.$store.dispatch(new GetAllRoleEmployeeAction());
    }

    public create() {
        this.$store.dispatch(new CreateEmployeeAction(this.createModel));
        this.cancel();
    }

    public cancel() {
        this.dialogRef.close();
    }

    public log(param: string) : void {
        console.log(param)
    }
}
