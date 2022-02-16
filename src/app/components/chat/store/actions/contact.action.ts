import { UserModel } from "src/app/shared/models/view-models/user/user.model";

export class GetContactAction {
    static readonly type = '[CONTACT] GetContactAction';
    constructor(public payload: string) {}
}

export class GetAllContactsAction {
    static readonly type = '[CONTACT] GetAllContactsAction';
    constructor() {}
}

export class PickContactAction {
    static readonly type = '[CONTACT] PickContactAction';
    constructor(public user: UserModel) {}
}

export class GetContactPictureAction {
    static readonly type = '[CONTACT] GetContactPictureAction';
    constructor(public payload: string) {}

    public getStateIdentifier() : string {
        return this.payload;
    }
}