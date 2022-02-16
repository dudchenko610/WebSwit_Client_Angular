import { CreateTechnologyModel } from "src/app/shared/models/view-models/technology/create-technology.model";
import { TechnologyFilterModel } from "src/app/shared/models/view-models/technology/filter-technology.model";
import { UpdateTechnologyModel } from "src/app/shared/models/view-models/technology/update-technology.model";
import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

export class GetAllTechnologiesAction {
    static readonly type = '[TECHNOLOGY] GetAllTechnologiesAction';
    constructor() {}
}

@GlobalLoader()
export class CreateTechnologyAction {
    static readonly type = '[TECHNOLOGY] CreateTechnologyAction';
    constructor(public payload: CreateTechnologyModel) {}
}

@GlobalLoader()
export class UpdateTechnologyAction {
    static readonly type = '[TECHNOLOGY] UpdateTechnologyAction';
    constructor(public payload: UpdateTechnologyModel) {}
}

@GlobalLoader()
export class DeleteTechnologyAction {
    static readonly type = '[TECHNOLOGY] DeleteTechnologyAction';
    constructor(public payload: string) {}
}

export class GetTechnologyAction {
    static readonly type = '[TECHNOLOGY] GetTechnologyAction';
    constructor(public payload: string) {}
}

export class GetTechnologiesAction {
    static readonly type = '[TECHNOLOGY] GetTechnologiesAction';
    constructor(public payload: PageQuery, public filter: TechnologyFilterModel) {}
}