import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthState } from "./components/account/store/state/auth.state";
import { ProfileState } from "./components/account/store/state/profile.state";
import { FooterComponent } from "./components/dashboard-layout/footer/footer.component";
import { HeaderComponent } from "./components/dashboard-layout/header/header.component";
import { AuthGuardService } from "./guard/auth-guard.service";
import { AuthInterceptorService } from "./interceptors/auth.interceptor";
import { ErrorInterceptorService } from "./interceptors/error.interceptor";
import { CategoryProfile } from "./mapper/category.profile";
import { EmployeeProfile } from "./mapper/employee.profile";
import { OrderProfile } from "./mapper/order.profile";
import { RoleEmployeeProfile } from "./mapper/role-employee.profile";
import { TechnologyProfile } from "./mapper/technology.profile";
import { UserProfile } from "./mapper/user.profile";
import { ConstShared } from "./shared/constants/const-shared.constant";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { MapperModule } from "./shared/plugins/mapper/mapper.module";
import { WorkSampleProfile } from "./mapper/work-sample.profile";
import { WorkSamplePictureProfile } from "./mapper/work-sample-picture.profile";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { ActionDispatchModule } from "./shared/plugins/loader/action-dispatch.module";
import { SignalRService } from "./signal-r/signal-r.service";
import { SignalRState } from "./signal-r/signal-r.state";
import { ContactState } from "./components/chat/store/states/contact.state";
import { ResizeService } from "./shared/plugins/resize-observer/resize.service";

export function tokenGetter() {
    return localStorage.getItem(ConstShared.ACCESS_TOKEN);
}

const profiles = [
    CategoryProfile,
    UserProfile,
    EmployeeProfile,
    OrderProfile,
    RoleEmployeeProfile,
    TechnologyProfile,
    WorkSampleProfile,
    WorkSamplePictureProfile
];

@NgModule({
    declarations: [AppComponent, HeaderComponent, FooterComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxsModule.forRoot([AuthState, ProfileState, ContactState, SignalRState], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NoopAnimationsModule,
        MapperModule.withProfiles(profiles),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: [environment.apiUrl]
            }
        }),
        MatDialogModule,
        MatSelectModule,
        BrowserAnimationsModule,
        ActionDispatchModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        AuthGuardService,
        SignalRService,
        ResizeService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}