import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable, NgZone } from "@angular/core";
import { ProposalModel } from "src/app/shared/models/view-models/proposal/proposal.model";
import { ProposalFilterModel } from "src/app/shared/models/view-models/proposal/filter-proposal.model";
import { ProposalService } from "src/app/services/proposal/proposal.service";
import {
    CreateProposalAction,
    DeleteProposalAction,
    GetProposalsAction
} from "../actions/proposal.action";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ProposalSentComponent } from "../../../dashboard-layout/main/proposal-sent/proposal-sent.component";

export class ProposalStateModel {
    data: ProposalModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    proposalFilter: ProposalFilterModel;
}

@State<ProposalStateModel>({
    name: "proposal",
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 5,
        proposalFilter: new ProposalFilterModel()
    }
})
@Injectable()
export class ProposalState {
    constructor(
        private proposalService: ProposalService,
        private $store: Store,
        private matDialog: MatDialog,
        private zone: NgZone
    ) {}

    @Selector()
    static getData(state: ProposalStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: ProposalStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: ProposalStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: ProposalStateModel) {
        return state.totalItems;
    }

    @Action(GetProposalsAction)
    get(
        { getState, setState }: StateContext<ProposalStateModel>,
        { payload, filter }: GetProposalsAction
    ) {
        return this.proposalService.getFiltered(payload, filter).pipe(
            tap((result) => {
                const state = getState();

                setState({
                    ...state,
                    pageNumber: result.pageNumber,
                    pageSize: result.pageSize,
                    totalItems: result.totalItems,
                    data: result.data,

                    proposalFilter: filter
                });
            })
        );
    }

    @Action(DeleteProposalAction)
    delete(
        { getState }: StateContext<ProposalStateModel>,
        { payload }: DeleteProposalAction
    ) {
        return this.proposalService.delete(payload).pipe(
            tap((result) => {
                const state = getState();

                const pageNumber =
                    state.pageNumber >
                    Math.ceil((state.totalItems - 1) / state.pageSize)
                        ? state.pageNumber - 1
                        : state.pageNumber;

                this.$store.dispatch(
                    new GetProposalsAction(
                        {
                            pageNumber: pageNumber,
                            pageSize: state.pageSize
                        },
                        state.proposalFilter
                    )
                );
            })
        );
    }

    @Action(CreateProposalAction)
    create(
        {}: StateContext<ProposalStateModel>,
        { payload }: CreateProposalAction
    ) {
        return this.proposalService.create(payload).pipe(
            tap((result) => {
                this.zone.run(() => {
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.height = "340px";
                    dialogConfig.width = "380px";
                    dialogConfig.panelClass = "proposal-sent-container";
    
                    this.matDialog.open(ProposalSentComponent, dialogConfig);
                });
            })
        );
    }
}
