import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActionDispatchModule } from "../../plugins/loader/action-dispatch.module";
import { ImageModule } from "../image-component/image.module";
import { RotatingImageSliderComponent } from "./rotating-image-slider.component";

@NgModule({
    declarations: [RotatingImageSliderComponent],
    imports: [CommonModule, ActionDispatchModule, ImageModule],
    exports: [RotatingImageSliderComponent]
})
export class RotatingImageSliderModule {}
