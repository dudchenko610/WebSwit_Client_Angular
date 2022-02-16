import { RoleEmployeeModel } from 'src/app/shared/models/view-models/role-employee/role-emploee.model';
import { UpdateRoleEmployeeModel } from 'src/app/shared/models/view-models/role-employee/update-role-employee.model';
import { Profile } from '../shared/plugins/mapper/mapper.profile';

export class RoleEmployeeProfile extends Profile {
    constructor() {
        super();

        this.createMap(RoleEmployeeModel, UpdateRoleEmployeeModel);
    }
}
