import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/guard/auth-guard.service";
import { ConstRoles } from "src/app/shared/constants/const-roles.constant";
import { ListProposalComponent } from "./list-proposal/list-proposal.component";

const routes: Routes = [
    {
        path: "list",
        component: ListProposalComponent,
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
export class ProposalRoutingModule {}
