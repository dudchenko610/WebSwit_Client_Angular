
export class CreateWorkSamplePictureModel {
    id?: string;        //
    name?: string;      // just for mapper
    uploaded?: boolean; //

    workSampleId: string;
    file: File;
}