import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { ListUserComponent } from "./list-user/list-user.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { UserService } from "src/app/services/user/user.service";
import { NgxsModule } from "@ngxs/store";
import { ListUserState } from "./store/state/user.state";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { AdminGridModule } from "src/app/shared/components/admin-grid/admin-grid.module";
import { MatTableModule } from "@angular/material/table";
import { ContactState } from "../chat/store/states/contact.state";

@NgModule({
    declarations: [ListUserComponent, UpdateUserComponent ],
    imports: [
        CommonModule,
        UserRoutingModule,
        NgxsModule.forFeature([ListUserState, ContactState]),
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatDialogModule,
        AdminGridModule
    ],
    providers: [UserService]
})
export class UserModule {}
