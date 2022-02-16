import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ForgotPasswordModel } from 'src/app/shared/models/view-models/account/forgot-password.model';
import { ForgotPasswordAction } from '../store/actions/auth.action';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordModel: ForgotPasswordModel;
  constructor(
    private $store: Store
  ) {
    this.forgotPasswordModel = new ForgotPasswordModel();
   }

  ngOnInit(): void {
  }

  public forgotPassword(): void{
    this.$store.dispatch(new ForgotPasswordAction(this.forgotPasswordModel));
  }

}
