import { RoleEmployeeModel } from "../role-employee/role-emploee.model";

export class FilterEmployeeModel{
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    roles?: Array<RoleEmployeeModel> = new Array<RoleEmployeeModel>();
}