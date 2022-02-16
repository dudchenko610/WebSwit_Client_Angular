import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { MapperService } from 'src/app/shared/plugins/mapper/mapper.service';
import { RoleEmployeeModel } from 'src/app/shared/models/view-models/role-employee/role-emploee.model';
import { UpdateRoleEmployeeModel } from 'src/app/shared/models/view-models/role-employee/update-role-employee.model';
import { UpdateRoleEmployeeAction } from '../store/actions/role-employee.action';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  public updateModel: UpdateRoleEmployeeModel; 

  constructor(
    private $store: Store,
    @Inject(MAT_DIALOG_DATA) public role: RoleEmployeeModel,
    public dialogRef: MatDialogRef<UpdateRoleComponent>,
    private _mapperService: MapperService,
  ) {
    this.updateModel = new UpdateRoleEmployeeModel();
   }

  ngOnInit(): void {
    this.initForm();
  }

  public update(){
    this.$store.dispatch(new UpdateRoleEmployeeAction(this.updateModel));
    this.cancel();
  }

  public cancel(){
    this.dialogRef.close();
  }

  private initForm(){
    this.updateModel = this._mapperService.map(RoleEmployeeModel, UpdateRoleEmployeeModel, this.role);
  }
}
