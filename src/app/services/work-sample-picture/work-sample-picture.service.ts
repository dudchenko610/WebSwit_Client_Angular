import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { ConstRoutes } from "../../shared/constants/const-routes.constant";
import { CreateWorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample-picture/create-work-sample-picture.model";
import { buildFormData } from "src/app/shared/helpers/form-data/form-data.helper";

@Injectable({
    providedIn: "root"
})
export class WorkSamplePictureService {
    constructor(private http: HttpClient) {}

    getById(id: string) {
        return this.http.get(
            `${environment.apiUrl}${ConstRoutes.GET_BY_ID_SAMPLE_PICTURE}`,
            {
                params: { id },
                responseType: "blob"
            }
        );
    }

    create(model: CreateWorkSamplePictureModel) {
        const formData = buildFormData(model);

        return this.http.post(
            `${environment.apiUrl}${ConstRoutes.CREATE_WORK_SAMPLE_PICTURE}`,
            formData
        );
    }

    delete(id: string) {
        return this.http.get(
            `${environment.apiUrl}${ConstRoutes.DELETE_WORK_SAMPLE_PICTURE}`,
            { params: { id } }
        );
    }
}
