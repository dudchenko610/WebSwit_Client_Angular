import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstRoutes } from 'src/app/shared/constants/const-routes.constant';
import { PageQuery } from 'src/app/shared/models/common/page/page-query.models';
import { PageResponce } from 'src/app/shared/models/common/page/page-responce.model';
import { CreateEmployeeModel } from 'src/app/shared/models/view-models/employee/create-employee.model';
import { FilterEmployeeModel } from 'src/app/shared/models/view-models/employee/filter-employee.model';
import { EmployeeModel } from 'src/app/shared/models/view-models/employee/employee.model';
import { UpdateEmployeeModel } from 'src/app/shared/models/view-models/employee/update-employee.model';
import { QueryBuilder } from 'src/app/shared/helpers/query-builder/query-builder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private _http: HttpClient
  ) { }

  public listEmployee(filter: FilterEmployeeModel, pagination: PageQuery): Observable<PageResponce>{
    const params = QueryBuilder.add(filter).add(pagination).build();
    return this._http.get<PageResponce>(`${environment.apiUrl}${ConstRoutes.GET_EMPLOYEE}`, { params: params });
  }

  public delete(id: string): Observable<void>{
    return this._http.get<void>(`${environment.apiUrl}${ConstRoutes.DELETE_EMPLOYEE}`, { params: { id } });
  }

  public update(model: UpdateEmployeeModel): Observable<EmployeeModel>{
    return this._http.post<EmployeeModel>(`${environment.apiUrl}${ConstRoutes.UPDATE_EMPLOYEE}`, model );
  }

  public getById(id: string): Observable<EmployeeModel>{
    return this._http.get<EmployeeModel>(`${environment.apiUrl}${ConstRoutes.GET_BY_ID_EMPLOYEE}`, { params: {id}} );
  }

  public create(model: CreateEmployeeModel){
    return this._http.post<EmployeeModel>(`${environment.apiUrl}${ConstRoutes.CREATE_EMPLOYEE}`, model );

  }
}
