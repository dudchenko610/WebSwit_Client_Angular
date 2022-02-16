import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { MapperService } from "src/app/shared/plugins/mapper/mapper.service";
import { EmployeeModel } from "src/app/shared/models/view-models/employee/employee.model";
import { UpdateEmployeeModel } from "src/app/shared/models/view-models/employee/update-employee.model";
import { RoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/role-emploee.model";
import { GetAllRoleEmployeeAction } from "../../role-employee/store/actions/role-employee.action";
import { RoleEmployeeState } from "../../role-employee/store/state/role-employee.state";
import { UpdateEmployeeAction } from "../store/actions/employee.action";

@Component({
    selector: "app-update-employee",
    templateUrl: "./update-employee.component.html",
    styleUrls: ["./update-employee.component.scss"]
})
export class UpdateEmployeeComponent implements OnInit {
    public updateModel: UpdateEmployeeModel;
    public roles: RoleEmployeeModel[];

    @Select(RoleEmployeeState.getAll)
    dataObservable: Observable<RoleEmployeeModel[]>;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public employee: EmployeeModel,
        public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
        private readonly mapperService: MapperService,
        private readonly $store: Store
    ) {
        this.updateModel = new UpdateEmployeeModel();
        this.roles = new Array<RoleEmployeeModel>();
    }

    ngOnInit(): void {
        this.dataObservable.subscribe((roles) => {
            this.roles = roles;
        });
        
        this.updateModel = this.mapperService.map(
            EmployeeModel,
            UpdateEmployeeModel,
            this.employee
        );

        this.$store.dispatch(new GetAllRoleEmployeeAction());
    }

    public update() {
        this.$store.dispatch(new UpdateEmployeeAction(this.updateModel));
        this.cancel();
    }

    public cancel() {
        this.dialogRef.close();
    }
}
