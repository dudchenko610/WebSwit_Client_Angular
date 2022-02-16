import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/guard/auth-guard.service";
import { ConstRoles } from "src/app/shared/constants/const-roles.constant";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
    { path: "sign-in", component: SignInComponent },
    { path: "sign-up", component: SignUpComponent },
    { path: "confirm-email", component: ConfirmEmailComponent },
    { path: "forgot-password", component: ForgotPasswordComponent },
    {
        path: "profile",
        component: MyProfileComponent,
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {}
