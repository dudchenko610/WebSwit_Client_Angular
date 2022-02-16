import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CreateWorkSamplePictureModel } from "../shared/models/view-models/work-sample-picture/create-work-sample-picture.model";
import { WorkSamplePictureModel } from "../shared/models/view-models/work-sample-picture/work-sample-picture.model";
import { Profile } from "../shared/plugins/mapper/mapper.profile";

@Injectable()
export class WorkSamplePictureProfile extends Profile {
    constructor(private sanitizer: DomSanitizer) {
        super();

        this.createMap(CreateWorkSamplePictureModel, WorkSamplePictureModel, {
            name: (opt) => opt.mapFrom((src) => src.file.name),
            file: (opt) =>
                opt.mapFrom((src) =>
                    this.sanitizer.bypassSecurityTrustUrl(
                        URL.createObjectURL(
                            new Blob([src.file], { type: src.file.type })
                        )
                    )
                )
        });
    }
}
