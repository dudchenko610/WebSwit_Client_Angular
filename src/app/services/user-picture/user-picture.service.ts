import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { ConstRoutes } from "../../shared/constants/const-routes.constant";
import { buildFormData } from "src/app/shared/helpers/form-data/form-data.helper";
import { CreateUserPictureModel } from "src/app/shared/models/view-models/user-picture/create-user-picture-model";

@Injectable({
    providedIn: "root"
})
export class UserPictureService {
    constructor(private http: HttpClient) {}

    get(userId: string) {
        return this.http.get(
            `${environment.apiUrl}${ConstRoutes.GET_USER_PICTURE}`,
            {
                params: { userId },
                responseType: "blob"
            }
        );
    }

    create(model: CreateUserPictureModel) {
        const formData = buildFormData(model);

        return this.http.post(
            `${environment.apiUrl}${ConstRoutes.CREATE_USER_PICTURE}`,
            formData
        );
    }

    delete() {
        return this.http.get(
            `${environment.apiUrl}${ConstRoutes.DELETE_USER_PICTURE}`
        );
    }
}
