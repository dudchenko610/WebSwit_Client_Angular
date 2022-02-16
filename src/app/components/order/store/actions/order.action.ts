import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { CreateOrderModel } from "src/app/shared/models/view-models/order/create-order.model";
import { FilterOrderModel } from "src/app/shared/models/view-models/order/filter-order.model";
import { UpdateOrderModel } from "src/app/shared/models/view-models/order/update-order.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

export class ListOrderAction{
    public static type = '[Order] ListOrderAction';
    constructor(public filter: FilterOrderModel, public pagination: PageQuery){}
}

@GlobalLoader()
export class UpdateOrderAction{
    public static type = '[Order] UpdateOrderAction';
    constructor(public payload: UpdateOrderModel){}
}

export class GetByIdOrderAction{
    public static type = '[Order] GetByIdOrderAction';
    constructor(public payload: string){}
}

@GlobalLoader()
export class DeleteOrderAction{
    public static type = '[Order] DeleteOrderAction';
    constructor(public payload: string){}
}

@GlobalLoader()
export class CreateOrderAction{
    public static type = '[Order] CreateOrderAction';
    constructor(public payload: CreateOrderModel){}
}