import { SafeUrl } from "@angular/platform-browser";

export class WorkSamplePictureModel {
    id: string;
    name: string;
    workSampleId: string;
    file: SafeUrl;

    uploaded?: boolean;
}