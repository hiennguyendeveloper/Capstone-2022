import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {SnackBarService} from "../services/snack-bar.service";
import {RoleEnum} from "../enum/RoleEnum";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private snackbarService: SnackBarService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.userAuthenticationInfo.getValue() == null || this.authService.userAuthenticationInfo.getValue() == undefined)
      return false;

    let requiredRole = route.data['role'];
    let currentUser = this.authService.userAuthenticationInfo.getValue();

    let currentRole = RoleEnum[currentUser!.role];


    if (currentRole == requiredRole)
      return true;

    else {

      this.router.navigate(['/testimonials']).then(() => {
        this.snackbarService.showSnackBarAlert("Unauthorized", "error", 4000)
      });
      return false
    }

  }

}
