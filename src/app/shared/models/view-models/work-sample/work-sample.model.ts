import { WorkSamplePictureModel } from "../work-sample-picture/work-sample-picture.model";

export class WorkSampleModel {
    id: string;
    name: string;
    description: string;
    showOnHome: boolean;
    technologyId: string;
    mainPictureId: string;
    mainPicture: WorkSamplePictureModel;
    pictures: WorkSamplePictureModel[];
}