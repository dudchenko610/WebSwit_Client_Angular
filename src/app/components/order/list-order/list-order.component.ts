import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FilterOrderModel } from "src/app/shared/models/view-models/order/filter-order.model";
import { OrderModel } from "src/app/shared/models/view-models/order/order.model";
import { CreateOrderComponent } from "../create-order/create-order.component";
import {
    DeleteOrderAction,
    ListOrderAction
} from "../store/actions/order.action";
import { OrderState } from "../store/state/order.state";
import { UpdateOrderComponent } from "../update-order/update-order.component";

@Component({
    selector: "app-list-order",
    templateUrl: "./list-order.component.html",
    styleUrls: ["./list-order.component.scss"]
})
export class ListOrderComponent implements OnInit {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(OrderState.getData) orderListObservable: Observable<OrderModel[]>;
    @Select(OrderState.getPageNumber) pageNumberObservable: Observable<number>;
    @Select(OrderState.getPageSize) pageSizeObservable: Observable<number>;
    @Select(OrderState.getTotalItems) totalOrderObservable: Observable<number>;

    public filter: FilterOrderModel;

    public pageNumber: number;
    public pageSize: number;
    public totalItems: number;
    public orders: OrderModel[];

    constructor(private $store: Store, private _matDialog: MatDialog) {}

    ngOnInit(): void {
        this.pageNumberObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.pageNumber = data;
            });

        this.pageSizeObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.pageSize = data;
            });

        this.totalOrderObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.totalItems = data;
            });

        this.orderListObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.orders = data;
            });

        this.$store.dispatch(
            new ListOrderAction(
                {
                    categoryId: null,
                    endOfProject: null,
                    name: null,
                    price: null,
                    startOfProject: null
                },
                {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            )
        );
    }

    public delete(id: string) {
        this.$store.dispatch(new DeleteOrderAction(id));
    }

    public update(order: OrderModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = order;

        this._matDialog.open(UpdateOrderComponent, dialogConfig);
    }

    public create() {
        this._matDialog.open(CreateOrderComponent);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
