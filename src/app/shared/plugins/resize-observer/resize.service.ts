import { Injectable } from "@angular/core";
import { ResizeEvent } from "@thalesrc/resize-manager";
import { Subject, Subscription } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ResizeService {
    private subject: Subject<ResizeEvent>;

    constructor() {
        this.subject = new Subject<ResizeEvent>();

        window.onresize = (event) => {
            this.subject.next({
                width: event.target.innerWidth,
                height: event.target.innerHeight
            });
        };
    }

    public subscribe(next: (value: ResizeEvent) => void): Subscription {
        return this.subject.subscribe(next);
    }
}
