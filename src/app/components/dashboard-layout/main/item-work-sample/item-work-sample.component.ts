import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RotatingImageSliderItemModel } from "src/app/shared/components/rotating-image-slider-component/rotating-image-slider-item.model";
import { WorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample-picture/work-sample-picture.model";
import { WorkSampleModel } from "src/app/shared/models/view-models/work-sample/work-sample.model";
import { GetOnHomeWorkSamplePicturesAction } from "../store/actions/main.action";
import { MainState } from "../store/states/main.state";

@Component({
    selector: "app-item-work-sample",
    templateUrl: "./item-work-sample.component.html",
    styleUrls: ["./item-work-sample.component.scss"]
})
export class ItemWorkSampleComponent implements OnInit {
    public pictureModels: WorkSamplePictureModel[];
    public imageModels: RotatingImageSliderItemModel[];

    @Select(MainState.getPictures)
    picturesObservable: Observable<WorkSamplePictureModel[]>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public workSampleModel: WorkSampleModel,
        private readonly $store: Store,
        public readonly dialogRef: MatDialogRef<ItemWorkSampleComponent>
    ) {
        this.pictureModels = [];
        this.imageModels = [];
    }

    ngOnInit(): void {
        
        // this.sub = this.route.params.subscribe((params) => {
             //this.$store.dispatch(new GetByIdWorkSampleAction(params["id"])); // from query
        // });
        this.$store.dispatch(new GetOnHomeWorkSamplePicturesAction(this.workSampleModel));

        this.picturesObservable.subscribe((pictureModels: WorkSamplePictureModel[]) => {
            if (pictureModels) {
                this.pictureModels = pictureModels;
                this.imageModels = this.getImageModels();
            }
        });
    }

    private getImageModels(): RotatingImageSliderItemModel[] {
        if (!this.pictureModels) {
            return [];
        }

        const mainPictureId = this.workSampleModel.mainPictureId;
        return this.pictureModels
            .filter((x) => x.id != mainPictureId)
            .map(
                (picture) =>
                    new RotatingImageSliderItemModel(
                        picture.file,
                        "[MAIN] GetOnHomeByIdWorkSamplePictureAction",
                        picture.id
                    )
            );
    }

    public onCloseDialog() {
        this.dialogRef.close();
    }
}
