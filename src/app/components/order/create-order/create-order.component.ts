import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import { CreateOrderModel } from "src/app/shared/models/view-models/order/create-order.model";
import { GetAllCategoriesAction } from "../../category/store/actions/category.action";
import { CategoryState } from "../../category/store/state/category.state";
import { CreateOrderAction } from "../store/actions/order.action";

@Component({
    selector: "app-create-order",
    templateUrl: "./create-order.component.html",
    styleUrls: ["./create-order.component.scss"]
})
export class CreateOrderComponent implements OnInit {
    private readonly _onDestroy: Subject<any> = new Subject();

    public createModel: CreateOrderModel;
    public categories: CategoryModel[];

    @Select(CategoryState.getAll)
    dataObservable: Observable<CategoryModel[]>;

    constructor(
        private $store: Store,
        public dialogRef: MatDialogRef<CreateOrderComponent>
    ) {
        this.createModel = new CreateOrderModel();
        this.categories = new Array<CategoryModel>();
    }

    ngOnInit(): void {
        this.dataObservable.subscribe((categories) => {
            this.categories = categories;
        });

        this.$store.dispatch(new GetAllCategoriesAction());
    }

    public create() {
        this.$store.dispatch(new CreateOrderAction(this.createModel));
        this.cancel();
    }

    public cancel() {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
