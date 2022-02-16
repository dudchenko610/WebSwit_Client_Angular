import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { MapperService } from "src/app/shared/plugins/mapper/mapper.service";
import { TechnologyModel } from "src/app/shared/models/view-models/technology/technology.model";
import { UpdateWorkSampleModel } from "src/app/shared/models/view-models/work-sample/update-work-sample.model";
import { WorkSampleModel } from "src/app/shared/models/view-models/work-sample/work-sample.model";
import { GetAllTechnologiesAction } from "../../technology/store/actions/technology.action";
import { TechnologyState } from "../../technology/store/state/technology.state";
import { GetByIdWorkSampleAction, UpdateWorkSampleAction } from "../store/actions/work-sample.actions";
import { UploadPictureWorkSampleComponent } from "../upload-picture-work-sample/upload-picture-work-sample.component";
import { DeleteWorkSamplePictureAction, SetMainWorkSamplePictureAction } from "../store/actions/work-sample-item.action";
import { WorkSampleItemState } from "../store/state/work-sample-item.state";

@Component({
    selector: "app-update-work-sample",
    templateUrl: "./update-work-sample.component.html",
    styleUrls: ["./update-work-sample.component.scss"]
})
export class UpdateWorkSampleComponent implements OnInit {
    public updateWorkSampleModel: UpdateWorkSampleModel;
    public workSampleModel: WorkSampleModel;

    public technologies: TechnologyModel[];

    @Select(TechnologyState.getAll)
    dataObservable: Observable<TechnologyModel[]>;

    @Select(WorkSampleItemState.getData)
    workSampleModelObservable: Observable<WorkSampleModel>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public workSampleModelId: string,
        private readonly $store: Store,
        private readonly matDialog: MatDialog,
        private readonly mapperService: MapperService,
        public readonly dialogRef: MatDialogRef<UpdateWorkSampleComponent>
    ) {
        this.updateWorkSampleModel = new UpdateWorkSampleModel();
        this.technologies = new Array<TechnologyModel>();
    }

    ngOnInit(): void {
        this.dataObservable.subscribe((technologies) => {
            this.technologies = technologies;
        });

        this.workSampleModelObservable.subscribe((workSampleModel) => {
            if (workSampleModel) {
                this.workSampleModel = workSampleModel;
                this.updateWorkSampleModel = this.mapperService.map(
                    WorkSampleModel,
                    UpdateWorkSampleModel,
                    workSampleModel
                );
            }
        });

        this.$store.dispatch(new GetByIdWorkSampleAction(this.workSampleModelId));
        this.$store.dispatch(new GetAllTechnologiesAction());
    }

    public update(): void {
        this.$store.dispatch(
            new UpdateWorkSampleAction(this.updateWorkSampleModel)
        );
        this.cancel();
    }

    public cancel(): void {
        this.dialogRef.close();
    }

    public createPicture(workSampleId: string): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = workSampleId;

        this.matDialog.open(UploadPictureWorkSampleComponent, dialogConfig);
    }

    public deletePicture(workSamplePictureId: string): void {
        this.$store.dispatch(new DeleteWorkSamplePictureAction(workSamplePictureId));
    }

    public setMainPicture(pictureId: string) : void {
        this.$store.dispatch(new SetMainWorkSamplePictureAction({
            workSampleId: this.workSampleModel.id,
            workSamplePictureId: pictureId
        }));
    }
}
