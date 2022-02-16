import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { WorkSampleFilterModel } from "src/app/shared/models/view-models/work-sample/filter-work-sample.model";
import { WorkSampleModel } from "src/app/shared/models/view-models/work-sample/work-sample.model";
import { CreateWorkSampleComponent } from "../create-work-sample/create-work-sample.component";
import {
    DeleteWorkSampleAction,
    GetWorkSamplesAction
} from "../store/actions/work-sample.actions";
import { WorkSampleState } from "../store/state/work-sample.state";
import { UpdateWorkSampleComponent } from "../update-work-sample/update-work-sample.component";

@Component({
    selector: "app-list-work-sample",
    templateUrl: "./list-work-sample.component.html",
    styleUrls: ["./list-work-sample.component.scss"]
})
export class ListWorkSampleComponent implements OnInit {
    @Select(WorkSampleState.getData)
    dataObservable: Observable<WorkSampleModel[]>;

    @Select(WorkSampleState.getPageNumber)
    pageNumberObservable: Observable<number>;

    @Select(WorkSampleState.getPageSize)
    pageSizeObservable: Observable<number>;

    @Select(WorkSampleState.getTotalItems)
    totalItemsObservable: Observable<number>;

    data: WorkSampleModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;

    public filterModel: WorkSampleFilterModel;

    constructor(
        private $store: Store, 
        private matDialog: MatDialog) {
        this.filterModel = new WorkSampleFilterModel();
    }

    ngOnInit(): void {
        this.dataObservable.subscribe((data) => {
            this.data = data;
        });

        this.pageNumberObservable.subscribe((pageNumber) => {
            this.pageNumber = pageNumber;
        });

        this.pageSizeObservable.subscribe((pageSize) => {
            this.pageSize = pageSize;
        });

        this.totalItemsObservable.subscribe((totalItems) => {
            this.totalItems = totalItems;
        });

        this.$store.dispatch(
            new GetWorkSamplesAction(
                {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                },
                {
                    name: null
                }
            )
        );
    }

    public update(workSampleModel: WorkSampleModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = workSampleModel.id;

        this.matDialog.open(UpdateWorkSampleComponent, dialogConfig);
    }

    public create(): void {
        this.matDialog.open(CreateWorkSampleComponent);
    }

    public delete(id: string): void {
        this.$store.dispatch(new DeleteWorkSampleAction(id));
    }

    public filterWorkSample(event){

        this.filterModel.name = event.name;

        this.$store.dispatch(
            new GetWorkSamplesAction(
                {
                    pageNumber: 1,
                    pageSize: this.pageSize
                },
                {
                    name:  this.filterModel.name
                }
            )
        );
    }

    public pagination(event){
        this.$store.dispatch(
            new GetWorkSamplesAction(
                {
                    pageNumber: event,
                    pageSize: this.pageSize
                },
                {
                    name:  this.filterModel.name
                }
            )
        );
    }

    public select(event) {
        if(event.columnName == 'update'){
            this.update(event.row);
        }

        if(event.columnName == 'delete'){
            this.delete(event.row.id);
        }
    }
}
