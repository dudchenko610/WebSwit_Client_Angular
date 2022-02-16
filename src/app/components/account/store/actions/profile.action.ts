import { CreateUserPictureModel } from "src/app/shared/models/view-models/user-picture/create-user-picture-model";
import { UpdateUserModel } from "src/app/shared/models/view-models/user/update-user.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";
import { GettingErrorProfileComponent } from "../../my-profile/getting-error-profile/getting-error-profile.component";

@GlobalLoader(GettingErrorProfileComponent)
export class GetProfileAction {
    static readonly type = "[Profile] GetProfileAction";
    constructor() {}
}

@GlobalLoader()
export class UpdateProfileAction {
    static readonly type = "[Profile] UpdateProfileAction";
    constructor(public payload: UpdateUserModel) {}
}

@GlobalLoader()
export class CreateUserPictureAction {
    static readonly type = '[Profile] CreateUserPictureAction';
    constructor(public payload: CreateUserPictureModel) {}
}

@GlobalLoader()
export class GetProfilePictureAction {
    static readonly type = '[Profile] GetByIdProfilePictureAction';
    constructor(public payload: string) {}
}

@GlobalLoader()
export class DeleteUserPictureAction {
    static readonly type = '[Profile] DeleteUserPictureAction';
    constructor() {}
}