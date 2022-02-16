import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstRoutes } from "src/app/shared/constants/const-routes.constant";
import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { PageResponce } from "src/app/shared/models/common/page/page-responce.model";
import { CreateOrderModel } from "src/app/shared/models/view-models/order/create-order.model";
import { FilterOrderModel } from "src/app/shared/models/view-models/order/filter-order.model";
import { OrderModel } from "src/app/shared/models/view-models/order/order.model";
import { UpdateOrderModel } from "src/app/shared/models/view-models/order/update-order.model";
import { QueryBuilder } from "src/app/shared/helpers/query-builder/query-builder";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class OrderService {
    constructor(private _http: HttpClient) {}

    public listOrder(
        filter: FilterOrderModel,
        pagination: PageQuery
    ): Observable<PageResponce> {
        const params = QueryBuilder.add(filter).add(pagination).build();
        return this._http.get<PageResponce>(
            `${environment.apiUrl}${ConstRoutes.GET_ORDER}`,
            { params: params }
        );
    }

    public delete(id: string): Observable<void> {
        return this._http.get<void>(
            `${environment.apiUrl}${ConstRoutes.DELETE_ORDER}`,
            { params: { id } }
        );
    }

    public update(model: UpdateOrderModel): Observable<OrderModel> {
        return this._http.post<OrderModel>(
            `${environment.apiUrl}${ConstRoutes.UPDATE_ORDER}`,
            model
        );
    }

    public getById(id: string): Observable<OrderModel> {
        return this._http.get<OrderModel>(
            `${environment.apiUrl}${ConstRoutes.GET_BY_ID_ORDER}`,
            { params: { id } }
        );
    }

    public create(model: CreateOrderModel): Observable<OrderModel> {
        return this._http.post<OrderModel>(
            `${environment.apiUrl}${ConstRoutes.CREATE_ORDER}`,
            model
        );
    }
}
