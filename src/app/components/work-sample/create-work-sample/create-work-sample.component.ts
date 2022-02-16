import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { TechnologyModel } from "src/app/shared/models/view-models/technology/technology.model";
import { CreateWorkSampleModel } from "src/app/shared/models/view-models/work-sample/create-work-sample.model";
import { GetAllTechnologiesAction } from "../../technology/store/actions/technology.action";
import { TechnologyState } from "../../technology/store/state/technology.state";
import { CreateWorkSampleAction } from "../store/actions/work-sample.actions";

@Component({
    selector: "app-create-work-sample",
    templateUrl: "./create-work-sample.component.html",
    styleUrls: ["./create-work-sample.component.scss"]
})
export class CreateWorkSampleComponent implements OnInit {
    public createWorkSampleModel: CreateWorkSampleModel;
    public technologies: TechnologyModel[];

    @Select(TechnologyState.getAll)
    dataObservable: Observable<TechnologyModel[]>;

    constructor(
        private readonly $store: Store,
        public readonly dialogRef: MatDialogRef<CreateWorkSampleComponent>
    ) {
        this.createWorkSampleModel = new CreateWorkSampleModel();
        this.technologies = new Array<TechnologyModel>();
    }

    ngOnInit(): void {
        this.dataObservable.subscribe((technologies) => {
            this.technologies = technologies;
        });

        this.$store.dispatch(new GetAllTechnologiesAction());
    }

    public create(): void {
        this.$store.dispatch(
            new CreateWorkSampleAction(this.createWorkSampleModel)
        );
        this.cancel();
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}
