import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserAuthModel} from "../models/UserAuthModel";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private newUser: UserAuthModel | null;
  public userAuthenticationInfo: BehaviorSubject<UserAuthModel | null>;

  constructor() {
    this.userAuthenticationInfo = new BehaviorSubject<UserAuthModel | null>(null);
    this.newUser = new UserAuthModel("Carl");

  }

}
