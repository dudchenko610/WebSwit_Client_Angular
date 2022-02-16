import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstRoutes } from "src/app/shared/constants/const-routes.constant";
import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { PageResponce } from "src/app/shared/models/common/page/page-responce.model";
import { UpdateUserModel } from "src/app/shared/models/view-models/user/update-user.model";
import { FilterUserModel } from "src/app/shared/models/view-models/user/filter-user.model";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { environment } from "src/environments/environment";
import { QueryBuilder } from "src/app/shared/helpers/query-builder/query-builder";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private _http: HttpClient) {}

    public listUser(
        filter?: FilterUserModel,
        pagination?: PageQuery
    ): Observable<PageResponce> {
        const params = QueryBuilder.add(filter).add(pagination).build();
        return this._http.get<PageResponce>(
            `${environment.apiUrl}${ConstRoutes.LIST_USER}`,
            { params: params }
        );
    }

    public update(model: UpdateUserModel): Observable<UserModel> {
        return this._http.post<UserModel>(
            `${environment.apiUrl}${ConstRoutes.UPDATE_USER}`,
            model
        );
    }

    public getClientById(id: string): Observable<UserModel> {
        return this._http.get<UserModel>(
            `${environment.apiUrl}${ConstRoutes.GET_BY_ID_USER}`,
            { params: { id } }
        );
    }

    public delete(id: string): Observable<void> {
        return this._http.get<void>(
            `${environment.apiUrl}${ConstRoutes.DELETE_USER}`,
            { params: { id } }
        );
    }
}
