/* istanbul ignore file */
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, lastValueFrom} from "rxjs";
import {SnackBarService} from "./snack-bar.service";
import {UserInterfaceRoleModel} from "../interfaces/UserInterfaceRoleModel";
import {RoleModel} from '../models/RoleModel';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  public userDetails: UserInterfaceRoleModel | null;
  public userDetailsBS: BehaviorSubject<UserInterfaceRoleModel | null>;

  constructor(
    private httpClient: HttpClient,
    private snackBar: SnackBarService
  ) {
    this.userDetails = null;
    this.userDetailsBS = new BehaviorSubject<UserInterfaceRoleModel | null>(null);
  }

  async getUserDetails(id: number | null) {
    /* istanbul ignore next */
    if (id == null) {
      this.snackBar.showSnackBarAlert("UserDetailService--No Id was passed", "error")
      return false
    }

    const obs = this.httpClient.get<UserInterfaceRoleModel>(environment.baseApiUrl + "/admin/UserDetails/" + id);
    const pUserDetails = await lastValueFrom<UserInterfaceRoleModel>(obs);

    if (pUserDetails == null) {
      return false;
    }

    this.userDetails = pUserDetails;
    this.userDetailsBS.next(this.userDetails);
    return true;
  }

  /* istanbul ignore next */
  async saveUserDetails(userToSave: { id: any; first_name?: any; last_name?: any; userRole?: RoleModel; email?: any; picture?: string | null; progress?: number; dtm_last_login?: Date; }) {
    if (userToSave.id == null) {
      this.snackBar.showSnackBarAlert("UserDetailService--No Id was passed", "error")
      return false
    }

    const obs = this.httpClient.put<boolean>(environment.baseApiUrl + "/admin/UserDetails/" + userToSave.id, userToSave);
    const pUserDetails = await lastValueFrom<boolean>(obs);

    if (pUserDetails == null) {
      this.snackBar.showSnackBarAlert("UserDetailService--No detail was returned", "error")
      return false;
    }
    this.snackBar.showSnackBarAlert("Successfully Updated!", "success")
    return pUserDetails;
  }

}
