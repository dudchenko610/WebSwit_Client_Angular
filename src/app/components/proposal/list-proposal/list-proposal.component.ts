import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable, Subject } from "rxjs";

import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import { takeUntil } from "rxjs/operators";
import { ProposalState } from "../store/state/proposal.state";
import {
    DeleteProposalAction,
    GetProposalsAction
} from "../store/actions/proposal.action";
import { ProposalFilterModel } from "src/app/shared/models/view-models/proposal/filter-proposal.model";

@Component({
    selector: "app-proposal-list",
    templateUrl: "./list-proposal.component.html",
    styleUrls: ["./list-proposal.component.scss"]
})
export class ListProposalComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(ProposalState.getData)
    dataObservable: Observable<CategoryModel[]>;

    @Select(ProposalState.getPageNumber)
    pageNumberObservable: Observable<number>;

    @Select(ProposalState.getPageSize)
    pageSizeObservable: Observable<number>;

    @Select(ProposalState.getTotalItems)
    totalItemsObservable: Observable<number>;

    data: CategoryModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;

    filterModel: ProposalFilterModel;

    constructor(private $store: Store, private matDialog: MatDialog) {
        this.filterModel = new ProposalFilterModel();
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
            new GetProposalsAction(
                {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                },
                {
                    email: null,
                    phoneNumber: null
                }
            )
        );
    }

    public delete(id: string): void {
        this.$store.dispatch(new DeleteProposalAction(id));
    }

    public filterProposal(event): void {
        this.filterModel.email = event.email;
        this.filterModel.phoneNumber = event.phoneNumber;

        this.$store.dispatch(
            new GetProposalsAction(
                {
                    pageNumber: 1,
                    pageSize: this.pageSize
                },
                {...this.filterModel}
            )
        );
    }

    public pagination(pageNumber): void {
        this.$store.dispatch(
            new GetProposalsAction(
                {
                    pageNumber: pageNumber,
                    pageSize: this.pageSize
                },
                {...this.filterModel}
            )
        );
    }

    public selected(event) {
        if (event.columnName == "delete") {
            this.delete(event.row.id);
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
