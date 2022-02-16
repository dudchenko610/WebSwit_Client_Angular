import { SafeUrl } from "@angular/platform-browser";

export class RotatingImageSliderItemModel {
    constructor(
        public image: SafeUrl,
        public action: string,
        public stateIdentifier: string
    ) {}
}
