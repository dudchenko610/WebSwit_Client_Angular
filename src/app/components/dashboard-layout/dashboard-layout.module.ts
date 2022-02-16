import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsModule } from "@ngxs/store";
import { MainComponent } from './main/main.component';
import { DashboardLayoutRoutingModule } from "./dashboard-layout-routing.module";
import { ActionDispatchModule } from "src/app/shared/plugins/loader/action-dispatch.module";
import { MainState } from "./main/store/states/main.state";
import { ImageModule } from "src/app/shared/components/image-component/image.module";
import { EscapeHtmlPipe } from "src/app/shared/pipes/escape-html.pipe";
import { RotatingImageSliderModule } from "src/app/shared/components/rotating-image-slider-component/rotating-image-slider.module";
import { ItemWorkSampleComponent } from "./main/item-work-sample/item-work-sample.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProposalState } from "../proposal/store/state/proposal.state";
import { DirectiveModule } from "src/app/shared/directives/directive.module";
//import { ResizeModule } from "@thalesrc/ng-utils";

@NgModule({
    declarations: [ 
        MainComponent,
        ItemWorkSampleComponent,
        EscapeHtmlPipe
    ],
    imports: [
        CommonModule,
        NgxsModule.forFeature([MainState, ProposalState]),
        DashboardLayoutRoutingModule,
        ActionDispatchModule,
        ImageModule,
        RotatingImageSliderModule,
        FormsModule,
        ReactiveFormsModule,
        DirectiveModule
    ],
    providers: []
})
export class DashboardLayoutModule {}
