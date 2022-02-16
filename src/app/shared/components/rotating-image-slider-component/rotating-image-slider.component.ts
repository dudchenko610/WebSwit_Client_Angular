import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import { RotatingImageSliderItemModel } from "./rotating-image-slider-item.model";

@Component({
    selector: "app-rotating-image-slider",
    templateUrl: "./rotating-image-slider.component.html",
    styleUrls: ["./rotating-image-slider.component.scss"]
})
export class RotatingImageSliderComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    @Input() imageModels: RotatingImageSliderItemModel[];
    @Input() period: number = 0;
    @Input() delay: number = 0;

    public offset: number = 0;
    public counter: number = 0;
    private direction: boolean = true;

    ngOnInit(): void {
        if (this.period) {
            const source = interval(this.period).pipe(delay(this.delay));
            
            this.subscription = source.subscribe(val => {
                this.onNext();
            });
        }
    }

    ngOnChanges() {
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    onNext() {
        this.direction = this.counter <= 0 ? true : (this.counter == this.imageModels.length - 1 ? false : this.direction)

        if (this.direction) {
            this.onNextClick();
        } else {
            this.onPreviousClick();
        }
    }

    onPreviousClick(): void {
        if (!this.imageModels || !this.imageModels.length) return;

        this.counter = this.counter <= 0 ? 0 : this.counter - 1;
        this.offset = -(100.0 / this.imageModels.length) * this.counter;
    }

    onNextClick(): void {
        if (!this.imageModels || !this.imageModels.length) return;

        this.counter =
            this.counter == this.imageModels.length - 1
                ? this.imageModels.length - 1
                : this.counter + 1;
        this.offset = -(100.0 / this.imageModels.length) * this.counter;
    }
}
