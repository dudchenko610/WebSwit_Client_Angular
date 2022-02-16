import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PageQuery } from 'src/app/shared/models/common/page/page-query.models';
import { PageResponse } from 'src/app/shared/models/common/page/page-response.models';
import { CreateTechnologyModel } from 'src/app/shared/models/view-models/technology/create-technology.model';
import { TechnologyFilterModel } from 'src/app/shared/models/view-models/technology/filter-technology.model';
import { TechnologyModel } from 'src/app/shared/models/view-models/technology/technology.model';
import { UpdateTechnologyModel } from 'src/app/shared/models/view-models/technology/update-technology.model';
import { QueryBuilder } from 'src/app/shared/helpers/query-builder/query-builder';
import { environment } from 'src/environments/environment';

import { ConstRoutes } from '../../shared/constants/const-routes.constant'

@Injectable({
    providedIn: 'root'
})
export class TechnologyService {
    constructor(private http: HttpClient, private router: Router) { }

    create(model: CreateTechnologyModel) : Observable<TechnologyModel> {
        return this.http.post<TechnologyModel>(`${environment.apiUrl}${ConstRoutes.CREATE_TECHNOLOGY}`, model);
    }

    getById(id: string) {
        return this.http.get(`${environment.apiUrl}${ConstRoutes.GET_TECHNOLOGY}${id}`);
    }

    get(paginationFilterModel: PageQuery, technologyFilterModel: TechnologyFilterModel) : Observable<PageResponse> {
        const params = QueryBuilder.add(paginationFilterModel).add(technologyFilterModel).build();
        return this.http.get<PageResponse>(`${environment.apiUrl}${ConstRoutes.GET_TECHNOLOGIES}`, {params: params});
    }

    update(model: UpdateTechnologyModel) : Observable<TechnologyModel> {
        return this.http.post<TechnologyModel>(`${environment.apiUrl}${ConstRoutes.UPDATE_TECHNOLOGY}`, model);
    }
 
    delete(id: string) {
        return this.http.get(`${environment.apiUrl}${ConstRoutes.DELETE_TECHNOLOGY}`, { params: {id} });
    }

    getAll(): Observable<Array<TechnologyModel>>{
        return this.http.get<Array<TechnologyModel>>(`${environment.apiUrl}${ConstRoutes.GET_ALL_TECHNOLOGIES}`);
    }
}