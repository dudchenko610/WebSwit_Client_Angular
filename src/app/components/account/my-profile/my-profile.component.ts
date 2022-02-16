import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "src/app/services/account/auth.service";
import { ConstRoles } from "src/app/shared/constants/const-roles.constant";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { DeleteUserPictureAction } from "../store/actions/profile.action";
import { AuthState } from "../store/state/auth.state";
import { ProfileState } from "../store/state/profile.state";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";

@Component({
    selector: "app-my-profile",
    templateUrl: "./my-profile.component.html",
    styleUrls: ["./my-profile.component.scss"]
})
export class MyProfileComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(ProfileState.getUser)
    userModelObservable: Observable<UserModel>;

    @Select(AuthState.isAuthenticated)
    isAuthenticatedObservable: Observable<boolean>;

    public userModel: UserModel = new UserModel();
    public isAdmin: boolean = false;

    constructor(private $store: Store, private matDialog: MatDialog, private authService: AuthService) {}

    ngOnInit(): void {
        this.userModelObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((userModel) => {
                this.userModel = userModel;
            });

        this.isAuthenticatedObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((isAuthenticated) => {
                this.isAdmin = isAuthenticated && this.authService.getRole() == ConstRoles.Admin
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    public deletePicture(): void {
        this.$store.dispatch(new DeleteUserPictureAction());
    }

    public update(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = this.userModel;
        dialogConfig.disableClose = false;

        this.matDialog.open(UpdateProfileComponent, dialogConfig);
    }
}
