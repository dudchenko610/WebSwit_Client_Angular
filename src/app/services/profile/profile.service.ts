import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstRoutes } from "src/app/shared/constants/const-routes.constant";
import { UpdateUserModel } from "src/app/shared/models/view-models/user/update-user.model";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class ProfileService {
    constructor(private _http: HttpClient) {}

    public update(model: UpdateUserModel): Observable<UserModel> {
        return this._http.post<UserModel>(
            `${environment.apiUrl}${ConstRoutes.UPDATE_PROFILE}`,
            model
        );
    }

    public get(): Observable<UserModel> {
        return this._http.get<UserModel>(
            `${environment.apiUrl}${ConstRoutes.GET_PROFILE}`
        );
    }
}
