import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SignOutAction } from '../components/account/store/actions/auth.action';
import { AuthService } from '../services/account/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private _authService: AuthService,
        private $store: Store
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const token = this._authService.getAccessToken();

        const isAuthenticated = token && !this._authService.isExpiredToken(token);

        if (isAuthenticated) {
            const expectedRole = route.data.expectedRole;
            const role = this._authService.getRole();

            if (!expectedRole && role) {
                return true;
            }
            
            if (expectedRole && role && expectedRole == role) {
                return true;
            }
        }

        this.$store.dispatch(new SignOutAction());
        return false;
    }
}