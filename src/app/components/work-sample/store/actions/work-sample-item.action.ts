import { CreateWorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample-picture/create-work-sample-picture.model";
import { SetMainWorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample/set-main-work-sample-picture.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

@GlobalLoader()
export class SetMainWorkSamplePictureAction {
    static readonly type = '[WORK_SAMPLE_PICTURE] SetMainWorkSamplePictureAction';
    constructor(public payload: SetMainWorkSamplePictureModel) {}
}

@GlobalLoader()
export class CreateWorkSamplePictureAction {
    static readonly type = '[WORK_SAMPLE_PICTURE] CreateWorkSamplePictureAction';
    constructor(public payload: CreateWorkSamplePictureModel) {}
}

export class GetByIdWorkSamplePictureAction {
    static readonly type = '[WORK_SAMPLE_PICTURE] GetByIdWorkSamplePictureAction';
    constructor(public payload: string) {}

    public getStateIdentifier() : string {
        return this.payload;
    }
}

export class DeleteWorkSamplePictureAction {
    static readonly type = '[WORK_SAMPLE_PICTURE] DeleteWorkSamplePictureAction';
    constructor(public payload: string) {}

    public getStateIdentifier() : string {
        return this.payload;
    }
}