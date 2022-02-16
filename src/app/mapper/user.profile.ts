import { UpdateUserModel } from "src/app/shared/models/view-models/user/update-user.model";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { Profile } from "../shared/plugins/mapper/mapper.profile";

export class UserProfile extends Profile {
    constructor() {
        super();

        this.createMap(UserModel, UpdateUserModel);
    }
}