import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable, Subject } from "rxjs";

import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import {
    DeleteCategoryAction,
    GetCategoriesAction
} from "../store/actions/category.action";
import { CategoryState } from "../store/state/category.state";
import { UpdateCategoryComponent } from "../update-category/update-category.component";
import { CreateCategoryComponent } from "../create-category/create-category.component";
import { takeUntil } from "rxjs/operators";
import { CategoryFilterModel } from "src/app/shared/models/view-models/category/filter-category.model";

@Component({
    selector: "app-category-list",
    templateUrl: "./list-category.component.html",
    styleUrls: ["./list-category.component.scss"]
})
export class ListCategoryComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(CategoryState.getData)
    dataObservable: Observable<CategoryModel[]>;

    @Select(CategoryState.getPageNumber)
    pageNumberObservable: Observable<number>;

    @Select(CategoryState.getPageSize)
    pageSizeObservable: Observable<number>;

    @Select(CategoryState.getTotalItems)
    totalItemsObservable: Observable<number>;

    data: CategoryModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;

    filterModel: CategoryFilterModel;

    constructor(private $store: Store, private matDialog: MatDialog) {
        this.filterModel = new CategoryFilterModel();
    }

    ngOnInit(): void {
        this.dataObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.data = data;
            });

        this.pageNumberObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((pageNumber) => {
                this.pageNumber = pageNumber;
            });

        this.pageSizeObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((pageSize) => {
                this.pageSize = pageSize;
            });

        this.totalItemsObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((totalItems) => {
                this.totalItems = totalItems;
            });

        this.$store.dispatch(
            new GetCategoriesAction(
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

    public update(categoryModel: CategoryModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = categoryModel;

        this.matDialog.open(UpdateCategoryComponent, dialogConfig);
    }

    public create(): void {
        this.matDialog.open(CreateCategoryComponent, new MatDialogConfig());
    }

    public delete(id: string): void {
        this.$store.dispatch(new DeleteCategoryAction(id));
    }

    public filterCategory(event): void {
        this.filterModel.name = event.name;

        this.$store.dispatch(
            new GetCategoriesAction(
                {
                    pageNumber: 1,
                    pageSize: this.pageSize
                },
                {
                    name: this.filterModel.name
                }
            )
        );
        
    }

    public pagination(pageNumber): void {
        this.$store.dispatch(
            new GetCategoriesAction(
                {
                    pageNumber: pageNumber,
                    pageSize: this.pageSize
                },
                {
                    name: this.filterModel.name
                }
            )
        );
    }

    public selected(event){
        if(event.columnName == 'update'){
            this.update(event.row);
        }

        if(event.columnName == 'delete'){
            this.delete(event.row.id);
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
