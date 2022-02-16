import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmployeeRoutingModule } from "./employee-routing.module";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { UpdateEmployeeComponent } from "./update-employee/update-employee.component";
import { ListEmployeeComponent } from "./list-employee/list-employee.component";
import { NgxsModule } from "@ngxs/store";
import { EmployeeState } from "./store/state/employee.state";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { ActionDispatchModule } from "src/app/shared/plugins/loader/action-dispatch.module";
import { RoleEmployeeState } from "../role-employee/store/state/role-employee.state";
import { AdminGridModule } from "src/app/shared/components/admin-grid/admin-grid.module";

@NgModule({
    declarations: [
        CreateEmployeeComponent,
        UpdateEmployeeComponent,
        ListEmployeeComponent
    ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        NgxsModule.forFeature([EmployeeState, RoleEmployeeState]),
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        ActionDispatchModule,
        AdminGridModule
    ]
})
export class EmployeeModule {}
