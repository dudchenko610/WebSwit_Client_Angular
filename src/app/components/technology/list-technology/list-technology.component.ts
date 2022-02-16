import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { TechnologyState } from "../store/state/technology.state";
import { TechnologyModel } from "src/app/shared/models/view-models/technology/technology.model";
import {
    DeleteTechnologyAction,
    GetTechnologiesAction
} from "../store/actions/technology.action";
import { UpdateTechnologyComponent } from "../update-technology/update-technology.component";
import { CreateTechnologyComponent } from "../create-technology/create-technology.component";
import { TechnologyFilterModel } from "src/app/shared/models/view-models/technology/filter-technology.model";

@Component({
    selector: "app-list-technology",
    templateUrl: "./list-technology.component.html",
    styleUrls: ["./list-technology.component.scss"]
})
export class ListTechnologyComponent implements OnInit {
    @Select(TechnologyState.getData)
    dataObservable: Observable<TechnologyModel[]>;

    @Select(TechnologyState.getPageNumber)
    pageNumberObservable: Observable<number>;

    @Select(TechnologyState.getPageSize)
    pageSizeObservable: Observable<number>;

    @Select(TechnologyState.getTotalItems)
    totalItemsObservable: Observable<number>;

    technologies: TechnologyModel[] = [];
    pageNumber: number;
    pageSize: number;
    totalItems: number;

    public filterModel: TechnologyFilterModel = new TechnologyFilterModel();

    constructor(private $store: Store, private matDialog: MatDialog) {}

    ngOnInit(): void {
        this.dataObservable.subscribe((technologies) => {
            this.technologies = technologies;
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
            new GetTechnologiesAction(
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

    public filterTechnology(event): void {
        this.filterModel = event;

        this.technologies = [];
        this.$store.dispatch(
            new GetTechnologiesAction(
                {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                },
                {
                    ...this.filterModel
                }
            )
        );
    }

    public pagination(pageNumber: number): void {
        this.pageNumber = pageNumber;

        this.technologies = [];
        this.$store.dispatch(
            new GetTechnologiesAction(
                {
                    pageNumber: pageNumber,
                    pageSize: this.pageSize
                },
                {
                    ...this.filterModel
                }
            )
        );
    }

    public update(technologyModel: TechnologyModel) {
        this.matDialog.open(UpdateTechnologyComponent, {
            data: technologyModel
        });
    }

    public create(): void {
        this.matDialog.open(CreateTechnologyComponent);
    }

    public delete(id: string): void {
        this.$store.dispatch(new DeleteTechnologyAction(id));
    }

    public select(event){
        if(event.columnName == 'update'){
            this.update(event.row);
        }

        if(event.columnName == 'delete'){
            this.delete(event.row.id);
        }
    }
}
