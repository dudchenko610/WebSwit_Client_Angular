import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsModule } from "@ngxs/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";

import { CategoryService } from "src/app/services/category/category.service";
import { ActionDispatchModule } from "src/app/shared/plugins/loader/action-dispatch.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { AdminGridModule } from "src/app/shared/components/admin-grid/admin-grid.module";
import { ProposalState } from "./store/state/proposal.state";
import { ListProposalComponent } from "./list-proposal/list-proposal.component";
import { ProposalRoutingModule } from "./proposal-routing.module";
import { ProposalSentComponent } from "../dashboard-layout/main/proposal-sent/proposal-sent.component";
import { SuccessIconComponentModule } from "src/app/shared/components/success-icon-component/success-icon.component.module";

@NgModule({
    declarations: [
        ListProposalComponent,
        ProposalSentComponent
    ],
    imports: [
        CommonModule,
        ProposalRoutingModule,
        NgxsModule.forFeature([ProposalState]),
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatTableModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ActionDispatchModule,
        NgxPaginationModule,
        AdminGridModule,
        SuccessIconComponentModule
    ],
    providers: [CategoryService]
})
export class ProposalModule {}
