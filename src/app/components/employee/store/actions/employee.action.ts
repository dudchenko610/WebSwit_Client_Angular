import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { CreateEmployeeModel } from "src/app/shared/models/view-models/employee/create-employee.model";
import { FilterEmployeeModel } from "src/app/shared/models/view-models/employee/filter-employee.model";
import { UpdateEmployeeModel } from "src/app/shared/models/view-models/employee/update-employee.model";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

export class ListEmployeeAction{
    public static type = '[Employee] ListEmployeeAction';
    constructor(public filter: FilterEmployeeModel, public pagination: PageQuery){}
}

@GlobalLoader()
export class UpdateEmployeeAction{
    public static type = '[Employee] UpdateEmployeeAction';
    constructor(public payload: UpdateEmployeeModel){}
}

export class GetByIdEmployeeAction{
    public static type = '[Employee] GetByIdEmployeeAction';
    constructor(public payload: string){}
}

@GlobalLoader()
export class DeleteEmployeeAction{
    public static type = '[Employee] DeleteEmployeeAction';
    constructor(public payload: string){}
}

@GlobalLoader()
export class CreateEmployeeAction{
    public static type = '[Employee] CreateEmployeeAction';
    constructor(public payload: CreateEmployeeModel){}
}