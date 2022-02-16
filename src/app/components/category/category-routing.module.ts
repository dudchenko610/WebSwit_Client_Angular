import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/guard/auth-guard.service";
import { ConstRoles } from "src/app/shared/constants/const-roles.constant";
import { ListCategoryComponent } from "./list-category/list-category.component";

const routes: Routes = [
    {
        path: "list",
        component: ListCategoryComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: ConstRoles.Admin
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule {}
