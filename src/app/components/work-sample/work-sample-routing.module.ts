import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/guard/auth-guard.service";
import { ConstRoles } from "src/app/shared/constants/const-roles.constant";
import { ListWorkSampleComponent } from "./list-work-sample/list-work-sample.component";

const routes: Routes = [
    {
        path: "list",
        component: ListWorkSampleComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedRole: ConstRoles.Admin
        }
    }
    // {
    //     path: "item/:id",
    //     component: ItemWorkSampleComponent,
    //     canActivate: [AuthGuardService],
    //     data: {
    //         expectedRole: ConstRoles.Admin
    //     }
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkSampleRoutingModule {}
