import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsModule } from "@ngxs/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";

import { TechnologyRoutingModule } from "./technology-routing.module";
import { ListTechnologyComponent } from "./list-technology/list-technology.component";
import { CreateTechnologyComponent } from "./create-technology/create-technology.component";
import { UpdateTechnologyComponent } from "./update-technology/update-technology.component";
import { TechnologyState } from "./store/state/technology.state";
import { CategoryState } from "../category/store/state/category.state";
import { MatButtonModule } from "@angular/material/button";
import { AdminGridModule } from "src/app/shared/components/admin-grid/admin-grid.module";
import { ActionDispatchModule } from "src/app/shared/plugins/loader/action-dispatch.module";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    declarations: [
        ListTechnologyComponent,
        CreateTechnologyComponent,
        UpdateTechnologyComponent
    ],
    imports: [
        CommonModule,
        TechnologyRoutingModule, 
        NgxsModule.forFeature([TechnologyState, CategoryState]),
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        ActionDispatchModule,
        AdminGridModule
    ]
})
export class TechnologyModule {}
