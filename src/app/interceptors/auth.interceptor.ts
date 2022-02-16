import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { UpdateTokensAction } from "../components/account/store/actions/auth.action";
import { AuthService } from "../services/account/auth.service";
import { ConstShared } from "../shared/constants/const-shared.constant";
import { TokenModel } from "../shared/models/view-models/account/token.model";

@Injectable({
    providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
        private $store: Store
        ){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this._authService.getAccessToken();

        if (accessToken){
            request = request.clone({
                setHeaders: {
                    Authorization: `${ConstShared.BEARER} ${accessToken}`
                }
            });
        }
        else{
            request = request.clone({
              /*  setHeaders: {
                    Accept: `${ConstShared.JSON_TYPE}`,
                    'Content-Type': `${ConstShared.JSON_TYPE}`
                }*/
            });
        }
        return next.handle(request);
    }
    
}
