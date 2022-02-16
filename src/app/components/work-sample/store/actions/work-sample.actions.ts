import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { CreateWorkSampleModel } from "src/app/shared/models/view-models/work-sample/create-work-sample.model";
import { WorkSampleFilterModel } from "src/app/shared/models/view-models/work-sample/filter-work-sample.model";
import { UpdateWorkSampleModel } from "src/app/shared/models/view-models/work-sample/update-work-sample.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

@GlobalLoader()
export class CreateWorkSampleAction {
    static readonly type = '[WORKSAMPLE] CreateWorkSampleAction';
    constructor(public payload: CreateWorkSampleModel) {}
}

@GlobalLoader()
export class UpdateWorkSampleAction {
    static readonly type = '[WORKSAMPLE] UpdateWorkSampleAction';
    constructor(public payload: UpdateWorkSampleModel) {}
}

@GlobalLoader()
export class DeleteWorkSampleAction {
    static readonly type = '[WORKSAMPLE] DeleteWorkSampleAction';
    constructor(public payload: string) {}
}

@GlobalLoader()
export class GetByIdWorkSampleAction {
    static readonly type = '[WORKSAMPLE] GetByIdWorkSampleAction';
    constructor(public payload: string) {}
}

export class GetWorkSampleAction {
    static readonly type = '[WORKSAMPLE] GetWorkSampleAction';
    constructor(public payload: string) {}
}

export class GetWorkSamplesAction {
    static readonly type = '[WORKSAMPLE] GetWorkSamplesAction';
    constructor(public payload: PageQuery, public filter: WorkSampleFilterModel) {}
}