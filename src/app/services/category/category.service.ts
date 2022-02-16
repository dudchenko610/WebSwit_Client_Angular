import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ConstRoutes } from '../../shared/constants/const-routes.constant'
import { CategoryModel } from "src/app/shared/models/view-models/category/category.model"
import { PageQuery } from 'src/app/shared/models/common/page/page-query.models';
import { CategoryFilterModel } from 'src/app/shared/models/view-models/category/filter-category.model'
import { PageResponse } from 'src/app/shared/models/common/page/page-response.models';
import { CreateCategoryModel } from "src/app/shared/models/view-models/category/create-category.model"
import { UpdateCategoryModel } from 'src/app/shared/models/view-models/category/update-category.model';
import { QueryBuilder } from 'src/app/shared/helpers/query-builder/query-builder'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private http: HttpClient) { }

    public create(model: CreateCategoryModel) : Observable<CategoryModel> {
        return this.http.post<CategoryModel>(`${environment.apiUrl}${ConstRoutes.CREATE_CATEGORY}`, model);
    }

    public getById(id: string) {
        return this.http.get(`${environment.apiUrl}${ConstRoutes.GET_CATEGORY}${id}`);
    }

    public get(paginationFilterModel: PageQuery, categoryFilterModel: CategoryFilterModel) : Observable<PageResponse> {
        const params = QueryBuilder.add(paginationFilterModel).add(categoryFilterModel).build();
        return this.http.get<PageResponse>(`${environment.apiUrl}${ConstRoutes.GET_CATEGORIES}`, {params: params});
    }

    public update(model: UpdateCategoryModel) : Observable<CategoryModel> {
        return this.http.post<CategoryModel>(`${environment.apiUrl}${ConstRoutes.UPDATE_CATEGORY}`, model);
    }
 
    public delete(id: string) {
        return this.http.get(`${environment.apiUrl}${ConstRoutes.DELETE_CATEGORY}`, { params: {id} });
    }

    public getAll(): Observable<Array<CategoryModel>>{
        return this.http.get<Array<CategoryModel>>(`${environment.apiUrl}${ConstRoutes.GET_ALL_CATEGORY}`);
    }
}