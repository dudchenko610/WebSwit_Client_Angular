import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountRoutingModule } from "./account-routing.module";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./store/state/auth.state";
import { AuthService } from "src/app/services/account/auth.service";
import { SignInComponent } from "./sign-in/sign-in.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DirectiveModule } from "src/app/shared/directives/directive.module";
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ActionDispatchModule } from "src/app/shared/plugins/loader/action-dispatch.module";
import { UpdateProfileComponent } from './my-profile/update-profile/update-profile.component';
import { ProfileState } from "./store/state/profile.state";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { ProfileService } from "src/app/services/profile/profile.service";
import { GettingErrorProfileComponent } from './my-profile/getting-error-profile/getting-error-profile.component';
import { ContactState } from "../chat/store/states/contact.state";

@NgModule({
  
    declarations: [SignInComponent, SignUpComponent, ConfirmEmailComponent, ForgotPasswordComponent, MyProfileComponent, UpdateProfileComponent, GettingErrorProfileComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        NgxsModule.forFeature([AuthState, ProfileState, ContactState]),
        ReactiveFormsModule,
        FormsModule,
        DirectiveModule,
        MatDialogModule,
        MatSelectModule,
        ActionDispatchModule
    ],
    providers: [AuthService, ProfileService]
})
export class AccountModule {}
