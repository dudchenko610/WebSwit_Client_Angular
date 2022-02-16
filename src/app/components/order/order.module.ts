import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { CreateOrderComponent } from "./create-order/create-order.component";
import { UpdateOrderComponent } from "./update-order/update-order.component";
import { ListOrderComponent } from "./list-order/list-order.component";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { OrderState } from "./store/state/order.state";
import { MatSelectModule } from "@angular/material/select";
import { ActionDispatchModule } from "src/app/shared/plugins/loader/action-dispatch.module";
import { CategoryState } from "../category/store/state/category.state"

@NgModule({
    declarations: [
        CreateOrderComponent,
        UpdateOrderComponent,
        ListOrderComponent
    ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        NgxsModule.forFeature([OrderState, CategoryState]),
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        ActionDispatchModule
    ]
})
export class OrderModule {}
