import { WorkSampleModel } from "src/app/shared/models/view-models/work-sample/work-sample.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

@GlobalLoader()
export class GetOnHomeCategoriesAction {
    static readonly type = '[MAIN] GetOnHomeCategoriesAction';
    constructor() {}
}

@GlobalLoader()
export class GetOnHomeWorkSampleAction {
    static readonly type = '[MAIN] GetOnHomeWorkSampleAction';
    constructor() {}
}

export class GetOnHomeByIdWorkSampleMainPictureAction {
    static readonly type = '[MAIN] GetOnHomeByIdWorkSampleMainPictureAction';
    constructor(public workSamplePictureId: string, public workSampleId: string) {}

    public getStateIdentifier() : string {
        return this.workSampleId;
    }
}

export class GetOnHomeWorkSamplePicturesAction {
    static readonly type = '[MAIN] GetOnHomeWorkSamplePicturesAction';
    constructor(public payload: WorkSampleModel) {}
}

export class GetOnHomeByIdWorkSamplePictureAction {
    static readonly type = '[MAIN] GetOnHomeByIdWorkSamplePictureAction';
    constructor(public payload: string) {}

    public getStateIdentifier() : string {
        return this.payload;
    }
}