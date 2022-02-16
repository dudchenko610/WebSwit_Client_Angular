import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/services/account/auth.service";
import {
    ConfirmEmailAction,
    SignInAction,
    SignUpAction,
    SignOutAction,
    ForgotPasswordAction,
    UpdateTokensAction
} from "../actions/auth.action";
import { tap } from "rxjs/operators";
import { ConstShared } from "src/app/shared/constants/const-shared.constant";
import { Router } from "@angular/router";
import { GetProfileAction } from "../actions/profile.action";
import { DestroySignalRConnectionAction, EstablishSignalRConnectionAction } from "src/app/signal-r/signal-r.actions";

export class AuthStateModel {
    isAuthenticated: boolean;
}

@State<AuthStateModel>({
    name: "auth",
    defaults: {
        isAuthenticated: false
    }
})
@Injectable()
export class AuthState {
    constructor(
        private authService: AuthService,
        private cookieService: CookieService,
        private router: Router,
        private $store: Store
    ) {}

    ngxsOnInit({ setState }: StateContext<AuthStateModel>) {
        const token = this.authService.getAccessToken();

        setState({
            isAuthenticated: token && !this.authService.isExpiredToken(token)
        });
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel) {
        return state.isAuthenticated;
    }

    @Action(SignInAction)
    signIn(
        { getState, setState }: StateContext<AuthStateModel>,
        { payload }: SignInAction
    ) {
        return this.authService.signIn(payload).pipe(
            tap((result) => {
                if (payload.rememberMe) {
                    this.cookieService.set(
                        ConstShared.REFRESH_TOKEN,
                        result.refreshToken,
                        { path: "/" }
                    );
                }

                this.cookieService.set(
                    ConstShared.ACCESS_TOKEN,
                    result.accessToken,
                    {
                        path: "/"
                    }
                );

                this.router.navigate(["/account/profile"]);

                const state = getState();
                setState({
                    ...state,
                    isAuthenticated: true
                });

                this.$store.dispatch(new GetProfileAction());
            })
        );
    }

    @Action(SignOutAction)
    signOut({ getState, setState }: StateContext<AuthStateModel>) {
        this.cookieService.delete(ConstShared.ACCESS_TOKEN, "/");
        this.cookieService.delete(ConstShared.REFRESH_TOKEN, "/");

        this.$store.dispatch(new DestroySignalRConnectionAction());

        const state = getState();
        setState({
            ...state,
            isAuthenticated: false
        });

        this.router.navigate(["/account/sign-in"]);
    }

    @Action(ConfirmEmailAction)
    confirmEmail(
        _: StateContext<AuthStateModel>,
        { payload }: ConfirmEmailAction
    ) {
        return this.authService.confirmEmail(payload);
    }

    @Action(SignUpAction)
    signUp(_: StateContext<AuthStateModel>, { payload }: SignUpAction) {
        return this.authService.signUp(payload);
    }

    @Action(ForgotPasswordAction)
    forgotPassword(
        _: StateContext<AuthStateModel>,
        { payload }: ForgotPasswordAction
    ) {
        return this.authService.forgotPassword(payload);
    }

    @Action(UpdateTokensAction)
    updateTokens(
        _: StateContext<AuthStateModel>,
        { payload }: UpdateTokensAction
    ) {
        return this.authService.updateTokens(payload).pipe(
            tap((result) => {
                if (result) {
                    this.cookieService.set(
                        ConstShared.ACCESS_TOKEN,
                        result.accessToken,
                        { path: "/" }
                    );
                    this.cookieService.set(
                        ConstShared.REFRESH_TOKEN,
                        result.refreshToken,
                        { path: "/" }
                    );
                }
            })
        );
    }
}
