import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { CreateRoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/create-role-employee.model";
import { UpdateRoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/update-role-employee.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

export class GetAllRoleEmployeeAction {
    public static type = "[RoleEmployee] GetAllRoleEmployeeAction";
    constructor() {}
}

export class ListRoleEmployeeAction {
    public static type = "[RoleEmployee] ListRoleEmployeeAction";
    constructor(public pagination: PageQuery) {}
}

@GlobalLoader()
export class UpdateRoleEmployeeAction {
    public static type = "[RoleEmployee] UpdateRoleEmployeeAction";
    constructor(public payload: UpdateRoleEmployeeModel) {}
}

@GlobalLoader()
export class DeleteRoleEmployeeAction {
    public static type = "[RoleEmployee] DeleteRoleEmployeeAction";
    constructor(public payload: string) {}
}

@GlobalLoader()
export class CreateRoleEmployeeAction {
    public static type = "[RoleEmployee] CreateRoleEmployeeAction";
    constructor(public payload: CreateRoleEmployeeModel) {}
}
