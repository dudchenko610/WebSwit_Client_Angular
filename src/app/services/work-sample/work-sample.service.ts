import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { PageResponse } from "src/app/shared/models/common/page/page-response.models";
import { CreateWorkSampleModel } from "src/app/shared/models/view-models/work-sample/create-work-sample.model";
import { WorkSampleFilterModel } from "src/app/shared/models/view-models/work-sample/filter-work-sample.model";
import { UpdateWorkSampleModel } from "src/app/shared/models/view-models/work-sample/update-work-sample.model";
import { WorkSampleModel } from "src/app/shared/models/view-models/work-sample/work-sample.model";
import { QueryBuilder } from "src/app/shared/helpers/query-builder/query-builder";
import { environment } from "src/environments/environment";

import { ConstRoutes } from "../../shared/constants/const-routes.constant";
import { CreateWorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample-picture/create-work-sample-picture.model";
import { buildFormData } from "src/app/shared/helpers/form-data/form-data.helper";
import { SetMainWorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample/set-main-work-sample-picture.model";

@Injectable({
    providedIn: "root"
})
export class WorkSampleService {
    constructor(private http: HttpClient, private router: Router) {}

    setMainPicture(model: SetMainWorkSamplePictureModel) {
        return this.http.post(
            `${environment.apiUrl}workSample/setMainPicture`,
            model
        );
    }

    create(model: CreateWorkSampleModel): Observable<WorkSampleModel> {
        return this.http.post<WorkSampleModel>(
            `${environment.apiUrl}${ConstRoutes.CREATE_WORK_SAMPLE}`,
            model
        );
    }

    getById(id: string) {
        return this.http.get(
            `${environment.apiUrl}${ConstRoutes.GET_BY_ID_WORK_SAMPLE}`,
            { params: { id } }
        );
    }

    get(
        paginationFilterModel: PageQuery,
        filterModel: WorkSampleFilterModel
    ): Observable<PageResponse> {
        const params = QueryBuilder.add(paginationFilterModel)
            .add(filterModel)
            .build();
        return this.http.get<PageResponse>(
            `${environment.apiUrl}${ConstRoutes.GET_WORK_SAMPLES}`,
            { params: params }
        );
    }

    getOnHome(): Observable<WorkSampleModel[]> {
        return this.http.get<WorkSampleModel[]>(
            `${environment.apiUrl}workSample/getOnHome`
        );
    }

    update(model: UpdateWorkSampleModel): Observable<WorkSampleModel> {
        return this.http.post<WorkSampleModel>(
            `${environment.apiUrl}${ConstRoutes.UPDATE_WORK_SAMPLE}`,
            model
        );
    }

    delete(id: string) {
        return this.http.get(
            `${environment.apiUrl}${ConstRoutes.DELETE_WORK_SAMPLE}`,
            { params: { id } }
        );
    }
}
