import {Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {UserAuthModel} from "../models/UserAuthModel";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JWTTokenDTO} from "../interfaces/JWTTokenDTO";
import {JWTTokenInterface} from "../interfaces/JWTTokenInterface";
import jwt_decode from "jwt-decode";
import {SnackBarService} from "./snack-bar.service";
import {Router} from "@angular/router";
import {LoggingService} from "./logging.service";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";
import {BasicResponseInterface} from "../interfaces/BasicResponseInterface";
import {UserInterface} from "../interfaces/UserInterface";
import {Instance} from "../helpers/instance";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userAuthInfo: UserAuthModel | null;
  public userAuthenticationInfo: BehaviorSubject<UserAuthModel | null>;
  public userDetailInfo: UserInterface | null;
  public userDetailInfoBS: BehaviorSubject<UserInterface | null>;

  constructor(private httpclient: HttpClient,
              private snackBar: SnackBarService,
              private router: Router,
              private loggingService: LoggingService) {

    this.userAuthInfo = null;
    this.userAuthenticationInfo = new BehaviorSubject<UserAuthModel | null>(null);

    this.userDetailInfo = null;
    this.userDetailInfoBS = new BehaviorSubject<UserInterface | null>(null);


  }

  private static decodedToken(token: JWTTokenDTO): JWTTokenInterface | null {
    try {
      return jwt_decode(token.access_token);
    } catch (e) {
      return null;
    }
  }

  private static storeCredentials(userAuthInfo: UserAuthModel) {
    if (userAuthInfo) {
      localStorage.setItem("userData", JSON.stringify(userAuthInfo))
    }

  }

  async login(email: string, password: string): Promise<boolean | null> {
    try {

      const headers = new HttpHeaders();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");

      const body = {
        email: email,
        password: password
      }

      const obs = this.httpclient.post<JWTTokenDTO>(environment.baseApiUrl + "/user/login", body, {headers: headers});
      return this.signMemberIntoApi(obs, email)

    } catch (e) {
      this.loggingService.logError(e, "Unable to login.")
      return false
    }

  }

  logout() {
    this.userAuthInfo = null;
    this.userAuthenticationInfo.next(null);
    this.userDetailInfoBS.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(["/testimonials"]).then();
  }

  async signMemberIntoApi(httpRequest: Observable<JWTTokenDTO>, email: string): Promise<boolean | null> {
    try {
      const result = await lastValueFrom<JWTTokenDTO>(httpRequest)

      console.log("This is result" + result.access_token)
      const decodedToken: JWTTokenInterface | null = AuthenticationService.decodedToken(result)
      console.log("This is decoded token" + decodedToken?.role)
      if (decodedToken != null && decodedToken.role != null) {
        this.userAuthInfo = new UserAuthModel(email, new Date(Number(decodedToken.exp) * 1000), decodedToken.role, result.access_token)
        this.userAuthenticationInfo.next(this.userAuthInfo)
        AuthenticationService.storeCredentials(this.userAuthInfo);
        await this.getUserDetails();
        return true
      }
      //if JWT-decode fails
      return false;

    } catch (e) {
      if (Instance.isInstanceOfApiErrorResponseInterface(e) || !e) {
        const p = (e as any)
        this.snackBar.showSnackBarAlert(p.readableErrorMessage, "error")
        return null;
      }
      return false;
    }

  }

  async getUserDetails() {
    if (this.userAuthInfo) {
      const obs = this.httpclient.get<UserInterface>(environment.baseApiUrl + "/user/get_details/" + this.userAuthInfo.email);
      const userInfo = await lastValueFrom<UserInterface>(obs);
      if (userInfo != null) {
        this.userDetailInfo = userInfo;
        this.userDetailInfoBS.next(null);
        this.userDetailInfoBS.next(this.userDetailInfo);
        return this.userDetailInfoBS;
      } else {
        return null;
      }
    }
    return null;
  }


  async autoLogin(): Promise<boolean> {
    try {

      const existingAuthInfo: UserAuthModel | null = JSON.parse(localStorage
        .getItem("userData") as string);


      if (existingAuthInfo?.access_token == null) {
        return false;
      }

      this.userAuthInfo = new UserAuthModel(existingAuthInfo.email, existingAuthInfo.exp, existingAuthInfo.role, existingAuthInfo.access_token);

      if (existingAuthInfo.exp < new Date()) {
        this.snackBar.showSnackBarAlert("Could not login please login again.", "error", 1000)
        this.logout();
        return false;
      } else {
        this.userAuthenticationInfo.next(this.userAuthInfo);

        return true;

      }


    } catch (e) {
      this.logout();

    }
    this.logout();
    return false;
    //hi

  }


  public async forgotPassword(email: string): Promise<boolean> {
    return false;

  }

  async Signup(signupFormGroup: FormGroup) {

    const userInterface = {
      id: 0,
      first_name: signupFormGroup.get('first_name')!.value,
      last_name: signupFormGroup.get('last_name')!.value,
      email: signupFormGroup.get('email')!.value,
      password: signupFormGroup.get('password')!.value,
    }

    let obs = this.httpclient.post<BasicResponseInterface>(environment.baseApiUrl + "/user/signup", userInterface);
    let result = await lastValueFrom<BasicResponseInterface>(obs);

    console.error("TYPE OF RESULT: " + typeof result)

    if (result) {
      this.snackBar.showSnackBarAlert("Please check your Email for confirmation", "success", 10000)
      return result;
    } else {
      this.snackBar.showSnackBarAlert("Unable to sign up", "error", 10000)
      return result;
    }

  }

  async deleteUser(id: number) {
    let obs = this.httpclient.get<BasicResponseInterface>(environment.baseApiUrl + "/user/delete_user/" + id);
    let result = await lastValueFrom<BasicResponseInterface>(obs);

    if (result) {
      this.snackBar.showSnackBarAlert("User successfully deleted.", "success")
      return result;
    } else {
      this.snackBar.showSnackBarAlert("Unable to delete user", "error")
      return result;
    }
  }
}
