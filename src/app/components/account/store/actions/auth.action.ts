import { ConfirmEmailModel } from "src/app/shared/models/view-models/account/confirm-email.model";
import { ForgotPasswordModel } from "src/app/shared/models/view-models/account/forgot-password.model";
import { SignInModel } from "src/app/shared/models/view-models/account/sign-in.model";
import { SignUpModel } from "src/app/shared/models/view-models/account/sign-up.model";
import { TokenModel } from "src/app/shared/models/view-models/account/token.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

@GlobalLoader()
export class SignInAction {
    static readonly type = "[Auth] SignInAction";
    constructor(public payload: SignInModel) {}
}

export class SignOutAction {
    static readonly type = "[Auth] SignOutAction";
}

@GlobalLoader()
export class SignUpAction {
    static readonly type = "[Auth] SignUpAction";
    constructor(public payload: SignUpModel) {}
}

@GlobalLoader()
export class ConfirmEmailAction {
    static readonly type = "[Auth] ConfirmEmailAction";
    constructor(public payload: ConfirmEmailModel) {}
}

@GlobalLoader()
export class ForgotPasswordAction {
    static readonly type = "[Auth] ForgotPasswordAction";
    constructor(public payload: ForgotPasswordModel) {}
}

export class UpdateTokensAction {
    static readonly type = "[Auth] UpdateTokensAction";
    constructor(public payload: TokenModel) {}
}
