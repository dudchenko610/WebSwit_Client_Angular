import { EmployeeModel } from 'src/app/shared/models/view-models/employee/employee.model';
import { UpdateEmployeeModel } from 'src/app/shared/models/view-models/employee/update-employee.model';
import { Profile } from 'src/app/shared/plugins/mapper/mapper.profile';

export class EmployeeProfile extends Profile {
    constructor() {
        super();

        this.createMap(EmployeeModel, UpdateEmployeeModel,
            { 
                roleIds: opt => opt.mapFrom(src => 
                    src.employeeInRoleEmployees.map(
                        (item) => {
                            return item.roleEmployeeId;
                        }
                    )
                )
            }
        );
    }
}
