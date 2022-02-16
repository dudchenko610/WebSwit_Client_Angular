import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { MapperService } from "src/app/shared/plugins/mapper/mapper.service";
import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import { OrderModel } from "src/app/shared/models/view-models/order/order.model";
import { UpdateOrderModel } from "src/app/shared/models/view-models/order/update-order.model";
import { GetAllCategoriesAction } from "../../category/store/actions/category.action";
import { CategoryState } from "../../category/store/state/category.state";
import { UpdateOrderAction } from "../store/actions/order.action";

@Component({
    selector: "app-update-order",
    templateUrl: "./update-order.component.html",
    styleUrls: ["./update-order.component.scss"]
})
export class UpdateOrderComponent implements OnInit {
    public updateModel: UpdateOrderModel;
    public categories: CategoryModel[];

    @Select(CategoryState.getAll)
    dataObservable: Observable<CategoryModel[]>;

    constructor(
        private $store: Store,
        @Inject(MAT_DIALOG_DATA) public order: OrderModel,
        public dialogRef: MatDialogRef<UpdateOrderComponent>,
        private _mapperService: MapperService
    ) {
        this.updateModel = new UpdateOrderModel();
        this.categories = new Array<CategoryModel>();
    }

    ngOnInit(): void {
        this.dataObservable.subscribe((categories) => {
            this.categories = categories;
        });

        this.updateModel = this._mapperService.map(
            OrderModel,
            UpdateOrderModel,
            this.order
        );

        this.$store.dispatch(new GetAllCategoriesAction());
    }

    public update() {
        this.$store.dispatch(new UpdateOrderAction(this.updateModel));
        this.cancel();
    }

    public cancel() {
        this.dialogRef.close();
    }
}
