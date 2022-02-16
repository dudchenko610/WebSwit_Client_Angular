import { EmployeeInRoleEmployeeModel } from "../employee-in-role-employee/employee-in-role-employee.model";

export class UpdateEmployeeModel{
    id: string;
    firstName: string;
    lastName:string;
    email: string;
    phoneNumber: string;
    description: string;
    roleIds: string[];

    constructor(){
        this.roleIds = new Array<string>();
    }
}