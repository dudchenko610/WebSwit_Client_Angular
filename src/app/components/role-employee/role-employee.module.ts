import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleEmployeeRoutingModule } from './role-employee-routing.module';
import { ListRoleComponent } from './list-role/list-role.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { NgxsModule } from '@ngxs/store';
import { RoleEmployeeState } from './store/state/role-employee.state';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionDispatchModule } from 'src/app/shared/plugins/loader/action-dispatch.module';
import { AdminGridModule } from 'src/app/shared/components/admin-grid/admin-grid.module';

@NgModule({
  declarations: [
    ListRoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent
  ],
  imports: [
    CommonModule,
    RoleEmployeeRoutingModule,
    NgxsModule.forFeature([RoleEmployeeState]),
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    ActionDispatchModule,
    AdminGridModule
  ]
})
export class RoleEmployeeModule { }
