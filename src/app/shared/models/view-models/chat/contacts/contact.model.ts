import { UserModel } from "../../user/user.model";

export class ContactModel {
    user: UserModel;
    unreadCount: number;
    millisecondsSince1970: number;
}