import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { GetAllContactsAction } from "src/app/components/chat/store/actions/contact.action";
import { ProfileService } from "src/app/services/profile/profile.service";
import { UserPictureService } from "src/app/services/user-picture/user-picture.service";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { EstablishSignalRConnectionAction } from "src/app/signal-r/signal-r.actions";
import { SignOutAction } from "../actions/auth.action";
import {
    CreateUserPictureAction,
    DeleteUserPictureAction,
    GetProfileAction,
    GetProfilePictureAction,
    UpdateProfileAction
} from "../actions/profile.action";

@State<UserModel>({
    name: "profile",
    defaults: {
        ...new UserModel()
    }
})
@Injectable()
export class ProfileState {
    constructor(
        private $store: Store,
        private profileService: ProfileService,
        private userPictureService: UserPictureService,
        private sanitizer: DomSanitizer
    ) {}

    @Selector()
    static getUser(state: UserModel) {
        return state;
    }

    @Action(GetProfilePictureAction)
    getByIdPicture(
        { getState, setState }: StateContext<UserModel>,
        { payload }: GetProfilePictureAction
    ) {
        return this.userPictureService.get(payload).pipe(
            tap((result: Blob) => {
                const state = getState();

                const file = this.sanitizer.bypassSecurityTrustUrl(
                    URL.createObjectURL(result)
                );

                setState({
                    ...state,
                    file: file
                });
            })
        );
    }

    @Action(CreateUserPictureAction)
    createPicture(
        { getState, setState }: StateContext<UserModel>,
        { payload }: CreateUserPictureAction
    ) {
        return this.userPictureService.create(payload).pipe(
            tap(() => {
                const state = getState();

                setState({
                    ...state,
                    file: this.sanitizer.bypassSecurityTrustUrl(
                        URL.createObjectURL(
                            new Blob([payload.file], {
                                type: payload.file.type
                            })
                        )
                    )
                });
            })
        );
    }

    @Action(DeleteUserPictureAction)
    deletePicture(
        { getState, setState }: StateContext<UserModel>,
        _: DeleteUserPictureAction
    ) {
        return this.userPictureService.delete().pipe(
            tap(() => {
                const state = getState();

                setState({
                    ...state,
                    file: null
                });
            })
        );
    }

    @Action(GetProfileAction)
    get({ setState }: StateContext<UserModel>, _: GetProfileAction) {
        return this.profileService.get().pipe(
            tap((result: UserModel) => {
                if (result.pictureName) {
                    this.$store.dispatch(new GetProfilePictureAction(result.id));
                }

                setState({
                    ...result
                });

                this.$store.dispatch(new EstablishSignalRConnectionAction());
                this.$store.dispatch(new GetAllContactsAction());
            })
        );
    }

    @Action(UpdateProfileAction)
    update(
        { getState, setState }: StateContext<UserModel>,
        { payload }: UpdateProfileAction
    ) {
        return this.profileService.update(payload).pipe(
            tap((result: UserModel) => {
                const state = getState();

                setState({
                    ...state,
                    ...result
                });
            })
        );
    }

    @Action(SignOutAction)
    signOut({ setState }: StateContext<UserModel>) {
        setState(new UserModel());
    }
}
