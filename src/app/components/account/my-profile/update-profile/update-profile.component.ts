import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { UpdateUserAction } from "src/app/components/user/store/actions/user.action";
import { CreateUserPictureModel } from "src/app/shared/models/view-models/user-picture/create-user-picture-model";
import { UpdateUserModel } from "src/app/shared/models/view-models/user/update-user.model";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { MapperService } from "src/app/shared/plugins/mapper/mapper.service";
import { CreateUserPictureAction } from "../../store/actions/profile.action";

@Component({
    selector: "app-update-profile",
    templateUrl: "./update-profile.component.html",
    styleUrls: ["./update-profile.component.scss"]
})
export class UpdateProfileComponent implements OnInit {
    public updateUserModel: UpdateUserModel;
    public createUserPictureModel: CreateUserPictureModel;

    constructor(
        private readonly $store: Store,
        private readonly mapperService: MapperService,
        public readonly dialogRef: MatDialogRef<UpdateProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public userModel: UserModel
    ) {
        this.createUserPictureModel = new CreateUserPictureModel();
    }

    ngOnInit(): void {
        this.updateUserModel = this.mapperService.map(
            UserModel,
            UpdateUserModel,
            this.userModel
        );
    }

    onFileChanged(files): void {
        if (files.length !== 0) {
            this.createUserPictureModel.file = files[0];
        }
    }

    upload(): void {
        if (this.createUserPictureModel.file) {
            this.$store.dispatch(
                new CreateUserPictureAction(this.createUserPictureModel)
            );
        }

        this.cancel();
    }

    public update(): void {
        this.$store.dispatch(new UpdateUserAction(this.updateUserModel));
        this.cancel();
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}
