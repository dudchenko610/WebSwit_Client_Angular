import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { MapperService } from 'src/app/shared/plugins/mapper/mapper.service';
import { UpdateUserModel } from 'src/app/shared/models/view-models/user/update-user.model';
import { UserModel } from 'src/app/shared/models/view-models/user/user.model';
import { UpdateUserAction } from '../store/actions/user.action';

@Component({
    selector: "app-update-user",
    templateUrl: "./update-user.component.html",
    styleUrls: ["./update-user.component.scss"]
})
export class UpdateUserComponent implements OnInit {
    public updateModel: UpdateUserModel;

    constructor(
        private readonly $store: Store,
        private readonly mapperService: MapperService,
        @Inject(MAT_DIALOG_DATA) public userModel: UserModel,
        public readonly dialogRef: MatDialogRef<UpdateUserComponent>
    ) {
        this.updateModel = new UpdateUserModel();
    }

    ngOnInit(): void {
        this.updateModel = this.mapperService.map(UserModel, UpdateUserModel, this.userModel);
    }

    public update(): void {
        this.$store.dispatch(new UpdateUserAction(this.updateModel));
        this.cancel();
    }

    public cancel() {
        this.dialogRef.close();
    }
}
