import { Component, Input, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
@Component({
    selector: "app-image",
    templateUrl: "./image.component.html",
    styleUrls: ["./image.component.scss"]
})
export class ImageComponent implements OnInit {
    @Input() image: SafeUrl;

    ngOnInit() {
    }
}
