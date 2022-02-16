import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { UpdateUserModel } from "src/app/shared/models/view-models/user/update-user.model";
import { FilterUserModel } from "src/app/shared/models/view-models/user/filter-user.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

export class ListUserAction{
    public static type = '[User] ListUserAction';
    constructor(public filter: FilterUserModel, public pagination: PageQuery){console.log('action');}
}

@GlobalLoader()
export class UpdateUserAction{
    public static type = '[User] UpdateUserAction';
    constructor(public payload: UpdateUserModel){}
}

@GlobalLoader()
export class DeleteUserAction{
    public static type = '[User] DeleteUserAction';
    constructor(public payload: string){}
}