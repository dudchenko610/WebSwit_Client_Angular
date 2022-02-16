import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { CreateWorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample-picture/create-work-sample-picture.model";
import { MapperService } from "src/app/shared/plugins/mapper/mapper.service";
import { CreateWorkSamplePictureAction } from "../store/actions/work-sample-item.action";

@Component({
    selector: "app-upload-picture-work-sample",
    templateUrl: "./upload-picture-work-sample.component.html",
    styleUrls: ["./upload-picture-work-sample.component.scss"]
})
export class UploadPictureWorkSampleComponent implements OnInit {
    public createWorkSamplePictureModel: CreateWorkSamplePictureModel;

    constructor(
        @Inject(MAT_DIALOG_DATA) public workSampleId: string,
        private readonly $store: Store,
        private readonly mapperService: MapperService,
        public readonly dialogRef: MatDialogRef<UploadPictureWorkSampleComponent>
    ) {
        this.createWorkSamplePictureModel = {
            workSampleId: this.workSampleId,
            file: null
        };
    }

    ngOnInit(): void {}

    onFileChanged(files): void {
        if (files.length !== 0) {
            this.createWorkSamplePictureModel.file = files[0];
        }
    }

    upload(): void {
        if (this.createWorkSamplePictureModel.file) {
            this.$store.dispatch(
                new CreateWorkSamplePictureAction(
                    this.createWorkSamplePictureModel
                )
            );
        }

        this.cancel();
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
