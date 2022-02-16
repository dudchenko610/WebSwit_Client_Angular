import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsModule } from "@ngxs/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";

import { CategoryState } from "./store/state/category.state";
import { CategoryRoutingModule } from "./category-routing.module";
import { ListCategoryComponent } from "./list-category/list-category.component";
import { UpdateCategoryComponent } from "./update-category/update-category.component";
import { CreateCategoryComponent } from "./create-category/create-category.component";
import { CategoryService } from "src/app/services/category/category.service";
import { ActionDispatchModule } from "src/app/shared/plugins/loader/action-dispatch.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { AdminGridModule } from "src/app/shared/components/admin-grid/admin-grid.module";

@NgModule({
    declarations: [
        ListCategoryComponent,
        UpdateCategoryComponent,
        CreateCategoryComponent
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        NgxsModule.forFeature([CategoryState]),
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatTableModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ActionDispatchModule,
        NgxPaginationModule,
        AdminGridModule
    ],
    providers: [CategoryService]
})
export class CategoryModule {}
