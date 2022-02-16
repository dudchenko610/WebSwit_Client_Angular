import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { WorkSampleRoutingModule } from "./work-sample-routing.module";
import { ListWorkSampleComponent } from "./list-work-sample/list-work-sample.component";
import { CreateWorkSampleComponent } from "./create-work-sample/create-work-sample.component";
import { UpdateWorkSampleComponent } from "./update-work-sample/update-work-sample.component";
import { NgxsModule } from "@ngxs/store";
import { WorkSampleState } from "./store/state/work-sample.state";
import { TechnologyState } from "../technology/store/state/technology.state";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { ActionDispatchModule } from "src/app/shared/plugins/loader/action-dispatch.module";
import { UploadPictureWorkSampleComponent } from "./upload-picture-work-sample/upload-picture-work-sample.component";
import { WorkSampleItemState } from "./store/state/work-sample-item.state";
import { ItemWorkSampleComponent } from "../dashboard-layout/main/item-work-sample/item-work-sample.component";
import { ImageModule } from "src/app/shared/components/image-component/image.module";
import { AdminGridModule } from "src/app/shared/components/admin-grid/admin-grid.module";
import { RotatingImageSliderModule } from "src/app/shared/components/rotating-image-slider-component/rotating-image-slider.module";

@NgModule({
    declarations: [
        ListWorkSampleComponent,
        CreateWorkSampleComponent,
        UpdateWorkSampleComponent,
        UploadPictureWorkSampleComponent
    ],
    imports: [
        CommonModule,
        WorkSampleRoutingModule,
        NgxsModule.forFeature([
            WorkSampleState,
            TechnologyState,
            WorkSampleItemState
        ]),
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        ActionDispatchModule,
        ImageModule,
        AdminGridModule
    ]
})
export class WorkSampleModule {}
