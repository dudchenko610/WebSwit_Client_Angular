import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "src/app/services/account/auth.service";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { SignOutAction } from "../../account/store/actions/auth.action";
import { GetProfileAction } from "../../account/store/actions/profile.action";
import { AuthState } from "../../account/store/state/auth.state";
import { ProfileState } from "../../account/store/state/profile.state";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(ProfileState.getUser)
    userModelObservable: Observable<UserModel>;

    public userModel: UserModel = new UserModel();

    @Select(AuthState.isAuthenticated)
    private authenticatedObservable: Observable<boolean>;

    public isModalMenu: boolean;
    public isAuth: boolean;
    public isHelperUser:  boolean;

    constructor(
        private router: Router,
        private authService: AuthService,
        private $store: Store
    ) {}

    ngOnInit(): void {
        this.authenticatedObservable.subscribe((isAuthenticated) => {
            this.isAuth = isAuthenticated;
        });

        const token = this.authService.getAccessToken();

        if (token && !this.authService.isExpiredToken(token)) {
            this.$store.dispatch(new GetProfileAction());
        }

        this.userModelObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((userModel) => {
                this.userModel = userModel;
            });
    }

    scrollToElement($element): void {
        console.log("this.isModalMenu", this.isModalMenu);
        if(this.isModalMenu){
            this.isModalMenu = false;
        }
        console.log("this.isModalMenu", this.isModalMenu);
        document.querySelector($element).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    public showHelperUser(){
        this.isHelperUser = !this.isHelperUser;
    }

    public hideHelperUser(event){

        if(!event.target.classList.contains("ng-star-inserted")){
            console.log("profile");
            this.isHelperUser = false;
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    public signOut() {
        this.$store.dispatch(new SignOutAction());
        this.isHelperUser = false;
    }

    public openModalMenu() {
        this.isModalMenu = !this.isModalMenu;
    }

    public profile(){
        this.router.navigateByUrl("account/profile");
        this.isHelperUser = false;
    }

    public chat(){
        this.router.navigateByUrl("/chat");
        this.isHelperUser = false;
    }

    public test(){
        console.log("focusout");
    }
}
