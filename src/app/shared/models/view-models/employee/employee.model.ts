import { EmployeeInRoleEmployeeModel } from "../employee-in-role-employee/employee-in-role-employee.model";

export class EmployeeModel{
    id: string;
    firstName: string;
    lastName:string;
    email: string;
    phoneNumber: string;
    description: string;
    roles: string;
    employeeInRoleEmployees: EmployeeInRoleEmployeeModel[];
}