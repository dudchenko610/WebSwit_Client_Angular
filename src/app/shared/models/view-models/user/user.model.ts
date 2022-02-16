import { SafeUrl } from "@angular/platform-browser";

export class UserModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    pictureName: string;

    file: SafeUrl;
}
