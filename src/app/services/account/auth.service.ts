import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";
import { ConstRoutes } from "src/app/shared/constants/const-routes.constant";
import { Observable } from "rxjs";
import { SignInModel } from "src/app/shared/models/view-models/account/sign-in.model";
import { TokenModel } from "src/app/shared/models/view-models/account/token.model";
import { SignUpModel } from "src/app/shared/models/view-models/account/sign-up.model";
import { ConfirmEmailModel } from "src/app/shared/models/view-models/account/confirm-email.model";
import { ForgotPasswordModel } from "src/app/shared/models/view-models/account/forgot-password.model";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(
        private _http: HttpClient,
        private _cookieService: CookieService
    ) {}

    public signIn(model: SignInModel): Observable<TokenModel> {
        return this._http.post<TokenModel>(
            `${environment.apiUrl}${ConstRoutes.SIGNIN}`,
            model
        );
    }

    public signOut() {
        this._cookieService.delete("accessToken", "/");
        this._cookieService.delete("refreshToken", "/");
    }

    public signUp(model: SignUpModel): Observable<void> {
        return this._http.post<void>(
            `${environment.apiUrl}${ConstRoutes.SIGNUP}`,
            model
        );
    }

    public confirmEmail(model: ConfirmEmailModel): Observable<void> {
        return this._http.get<void>(
            `${environment.apiUrl}${ConstRoutes.CONFIRM_EMAIL}?email=${model.email}&code=${model.code}`
        );
    }

    public forgotPassword(model: ForgotPasswordModel): Observable<void> {
        return this._http.post<void>(
            `${environment.apiUrl}${ConstRoutes.FORGOT_PASSWORD}`,
            model
        );
    }

    public updateTokens(model: TokenModel): Observable<TokenModel> {
        return this._http.post<TokenModel>(
            `${environment.apiUrl}${ConstRoutes.UPDATE_TOKENS}`,
            model
        );
    }

    public getInfoByAccessToken() {
        const accessToken = this.getAccessToken();
        const data = new JwtHelperService().decodeToken(accessToken);
        return data;
    }

    public getAccessToken(): string {
        return this._cookieService.get("accessToken");
    }

    public getRefreshToken(): string {
        return this._cookieService.get("refreshToken");
    }

    public isAuthenticated() : boolean {
        const data = this.getInfoByAccessToken();
        return data == null;
    }

    public getRole(): string {
        const data = this.getInfoByAccessToken();

        if (!data) {
            return null;
        }

        const role =
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

        return data[role];
    }

    public getLifeTimeToken() {
        const dataAboutToken = this.getInfoByAccessToken();
        const lifeTime = new Date(dataAboutToken.exp * 1000);
        /*.getHours() + ':'
         + new Date(dataAboutToken.exp*1000).getMinutes() + ':'
         + new Date(dataAboutToken.exp*1000).getSeconds(); */

        return lifeTime;
    }

    public isExpiredToken(token: string): boolean {
        return new JwtHelperService().isTokenExpired(token);
    }
}
