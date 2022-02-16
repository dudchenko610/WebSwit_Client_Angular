import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstRoutes } from "src/app/shared/constants/const-routes.constant";
import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { PageResponce } from "src/app/shared/models/common/page/page-responce.model";
import { CreateRoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/create-role-employee.model";
import { RoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/role-emploee.model";
import { UpdateRoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/update-role-employee.model";
import { QueryBuilder } from "src/app/shared/helpers/query-builder/query-builder";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class RoleEmployeeService {
    constructor(private _http: HttpClient) {}

    public listRoleEmployee(pagination: PageQuery): Observable<PageResponce> {
        const params = QueryBuilder.add(pagination).build();
        return this._http.get<PageResponce>(
            `${environment.apiUrl}${ConstRoutes.GET_ROLE_EMPLOYEES}`,
            { params: params }
        );
    }

    public delete(id: string): Observable<void> {
        return this._http.get<void>(
            `${environment.apiUrl}${ConstRoutes.DELETE_ROLE_EMPLOYEE}`,
            { params: { id } }
        );
    }

    public update(
        model: UpdateRoleEmployeeModel
    ): Observable<RoleEmployeeModel> {
        return this._http.post<RoleEmployeeModel>(
            `${environment.apiUrl}${ConstRoutes.UPDATE_ROLE_EMPLOYEE}`,
            model
        );
    }

    public getById(id: string): Observable<RoleEmployeeModel> {
        return this._http.get<RoleEmployeeModel>(
            `${environment.apiUrl}${ConstRoutes.GET_BY_ID_ROLE_EMPLOYEE}`,
            { params: { id } }
        );
    }

    public create(
        model: CreateRoleEmployeeModel
    ): Observable<RoleEmployeeModel> {
        return this._http.post<RoleEmployeeModel>(
            `${environment.apiUrl}${ConstRoutes.CREATE_ROLE_EMPLOYEE}`,
            model
        );
    }

    public getAll(): Observable<RoleEmployeeModel[]> {
        return this._http.get<RoleEmployeeModel[]>(
            `${environment.apiUrl}${ConstRoutes.GET_ALL_EMPLOYEE}`
        );
    }
}
