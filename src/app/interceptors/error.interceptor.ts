import {
    HttpErrorResponse,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UpdateTokensAction } from "../components/account/store/actions/auth.action";
import { AuthService } from "../services/account/auth.service";
import { AlertifyService } from "../services/alertify/alertify.service";
import { TokenModel } from "../shared/models/view-models/account/token.model";

@Injectable({
    providedIn: "root"
})
export class ErrorInterceptorService implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
        private $store: Store,
        private _alertifyService: AlertifyService
    ) {
        
    }

    accessToken = this._authService.getAccessToken();
    refreshToken = this._authService.getRefreshToken();

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 400) {
                    const errorMessage = this.handleBadRequest(error);
                    this._alertifyService.error(errorMessage);
                }

                if (error.status === 500){
                    const errorMessage = this.handleBadRequest(error);
                    this._alertifyService.error(errorMessage);
                }

                if (error.status === 0){
                    this._alertifyService.error("Error connection!");
                }

                if (error.status === 401) {

                    if (this.refreshToken) {
                        const tokenModel = new TokenModel();
                        tokenModel.accessToken = this.accessToken;
                        tokenModel.refreshToken = this.refreshToken;

                        this.$store.dispatch(new UpdateTokensAction(tokenModel));
                    }
                }

                return throwError(error);
            })
        );
    }

    private handleBadRequest(error: HttpErrorResponse): string {
        if (error.error != null) {
            let errorMessage = "";
            const values = Object.values(error.error);
            values.map((message: string) => {
                errorMessage += message + "\n";
            });
            return errorMessage;
        }
        return error.error ? error.error : error.message;
    }
}
