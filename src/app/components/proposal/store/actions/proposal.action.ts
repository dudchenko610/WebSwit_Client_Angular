import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { CreateProposalModel } from "src/app/shared/models/view-models/proposal/create-proposal.model";
import { ProposalFilterModel } from "src/app/shared/models/view-models/proposal/filter-proposal.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

@GlobalLoader()
export class CreateProposalAction {
    static readonly type = '[PROPOSAL] CreateProposalAction';
    constructor(public payload: CreateProposalModel) {}
}

@GlobalLoader()
export class DeleteProposalAction {
    static readonly type = '[PROPOSAL] DeleteProposalAction';
    constructor(public payload: string) {}
}

export class GetProposalsAction {
    static readonly type = '[PROPOSAL] GetProposalsAction';
    constructor(public payload: PageQuery, public filter: ProposalFilterModel) {}
}

