import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable, Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import { CreateProposalModel } from "src/app/shared/models/view-models/proposal/create-proposal.model";
import { WorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample-picture/work-sample-picture.model";
import { WorkSampleModel } from "src/app/shared/models/view-models/work-sample/work-sample.model";
import { CreateProposalAction } from "../../proposal/store/actions/proposal.action";
import { ItemWorkSampleComponent } from "./item-work-sample/item-work-sample.component";
import { ProposalSentComponent } from "./proposal-sent/proposal-sent.component";
import {
    GetOnHomeCategoriesAction,
    GetOnHomeWorkSampleAction
} from "./store/actions/main.action";
import { MainState } from "./store/states/main.state";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(MainState.getWorkSamples)
    public workSampleObservable: Observable<WorkSampleModel[]>;
    public workSamples: WorkSampleModel[] = [];

    @Select(MainState.getCategories)
    public categoriesObservable: Observable<CategoryModel[]>;
    public categories: CategoryModel[] = [];

    private resizeSubscription: Subscription;
    public blackout: number = 0;

    public categoryGridAnimateClass = "";
    public workSamplesAnimateClasses = [];

    @ViewChild("mainListContainerVC") mainListContainer;
    @ViewChild('f', { read: NgForm, static: false }) form: NgForm;

    private workSampleOffsets: number[] = [];

    public createProposalModel: CreateProposalModel;

    constructor(
        private store: Store,
        private matDialog: MatDialog,
        private router: Router
    ) {
        this.createProposalModel = new CreateProposalModel();
    }

    ngOnInit(): void {
        this.categoriesObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((categories) => {
                this.categories = categories;
            });

        this.workSampleObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((workSamples) => {
                this.workSamples = workSamples;

                if (workSamples && workSamples.length) {
                    workSamples.forEach(() => {
                        this.workSamplesAnimateClasses.push("");
                    });
                }
            });

        this.store.dispatch(new GetOnHomeCategoriesAction());
        this.store.dispatch(new GetOnHomeWorkSampleAction());
    }

    scrollToElement($element): void {
        document
            .querySelector($element)
            .scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });
    }

    //@HostListener("scroll", ["$event"])
    onScroll(event: any) {
        if (!this.workSampleOffsets.length) {
            this.calculateAnimationStartOffsets();
        }

        const ratio =
            event.target.scrollTop /
            (event.target.scrollHeight - event.target.clientHeight);
        this.blackout = ratio * 0.99;

        if (event.target.scrollTop > 260) {
            this.categoryGridAnimateClass = "animate";
        }

        this.workSampleOffsets.forEach((value, index) => {
            if (event.target.scrollTop > value) {
                this.workSamplesAnimateClasses[index] = "animate";
            }
        });
    }

    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    private calculateAnimationStartOffsets() {
        const mainServicesHeight =
            this.mainListContainer.nativeElement.querySelector(
                "#main-services-id"
            ).offsetHeight;
        const aboutUsHeight =
            this.mainListContainer.nativeElement.querySelector(
                "#main-about-us-id"
            ).offsetHeight;
        const workSamplesLabelHeight =
            this.mainListContainer.nativeElement.querySelector(
                "#main-work-samples-label-id"
            ).offsetHeight;

        this.workSamples.forEach((_, index) => {
            if (index == 0) {
                this.workSampleOffsets.push(
                    mainServicesHeight + workSamplesLabelHeight + aboutUsHeight + 200
                ); // just offset
            } else {
                const workSamplesIthHeight =
                    this.mainListContainer.nativeElement.querySelector(
                        `#main-work-samples-id :nth-child(${index + 1})`
                    ).offsetHeight;
                this.workSampleOffsets.push(
                    this.workSampleOffsets[index - 1] +
                        workSamplesIthHeight +
                        60
                ); // margin-bottom of workSample
            }
        });
    }

    public convertWorkSampleImagesToUrls(
        pictures: WorkSamplePictureModel[]
    ): SafeUrl[] {
        return pictures.map((x) => x.file);
    }

    public getMainPhoto(workSample: WorkSampleModel): SafeUrl {
        if (
            workSample.mainPictureId !=
                "00000000-0000-0000-0000-000000000000" &&
            workSample.pictures.length
        ) {
            return workSample.pictures.find(
                (x) => x.id == workSample.mainPictureId
            ).file;
        }
        return null;
    }

    public openWorkSample(workSample: WorkSampleModel): void {
        //this.router.navigateByUrl(`work-sample/item/${id}`);

        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = workSample;
        dialogConfig.panelClass = "fullscreen-dialog-close";
        dialogConfig.height = "90vh";
        dialogConfig.width = "90%";

        this.matDialog.open(ItemWorkSampleComponent, dialogConfig);
    }

    public createProposal() {
        if(this.form.valid){
            this.store.dispatch(new CreateProposalAction(this.createProposalModel));
            this.createProposalModel = new CreateProposalModel();
            this.form.resetForm();
        }
    }
}
