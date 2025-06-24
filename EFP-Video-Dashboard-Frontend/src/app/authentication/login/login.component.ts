import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {UserAuthModel} from "../../core/models/UserAuthModel";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {RoleEnum} from "../../core/enum/RoleEnum";
import {NavigationService} from "../../core/services/navigation.service";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;
  // error
  public display_login_error: boolean;
  public display_email_confirmation_error: boolean;
  //hide/show password
  public hidePassword: boolean;
  // user
  private userAuthenticationInfo: BehaviorSubject<UserAuthModel | null>;
  private User: UserAuthModel | null;
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              public dialogRef: MatDialogRef<LoginComponent>,
              private navService: NavigationService,
              public breakpointObserver: BreakpointObserver) {
    this.userAuthenticationInfo = authenticationService.userAuthenticationInfo;
    this.display_login_error = false;
    this.display_email_confirmation_error = false;
    this.User = null;
    this.hidePassword = true;

    this.loginFormGroup = this._formBuilder.group({
      email: ['', [Validators.required
        , Validators.pattern(/(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/)
        , Validators.maxLength(255)]],
      password: ['', Validators.required],
    });
    //breakpoint
    this.breakpointSubscription=this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]);
    this.breakpointSub = new Subscription();
  }

  ngOnInit(): void {
    this.breakpointSub = this.breakpointSubscription.subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        // handle XSmall breakpoint
        this.dialogRef.updateSize('100vw', '100vh')
      }
      if (result.breakpoints[Breakpoints.Small]) {
        // handle Small breakpoint
        this.dialogRef.updateSize('60vw', '60vh')
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        // handle Medium breakpoint
        this.dialogRef.updateSize('60vw', '60vh')


      }
      if (result.breakpoints[Breakpoints.Large]) {
        // handle Large breakpoint
        this.dialogRef.updateSize('60vw', '60vh')

      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        // handle XLarge breakpoint
        this.dialogRef.updateSize('60vw', '60vh')

      }
    });
  }

  async login() {
    let obs: boolean | null = await this.authenticationService.login(this.loginFormGroup.get('email')?.value, this.loginFormGroup.get('password')?.value);
    console.error(obs)
    if (obs==false) {
      this.display_login_error = true;
      return;
    }
    if (obs == null) {
      this.display_email_confirmation_error = !this.display_email_confirmation_error;
    }

    if (this.userAuthenticationInfo.getValue() == null) {
      this.display_login_error = !this.display_login_error;
    }

    this.User = this.userAuthenticationInfo.getValue();

    this.navService.getNavLinks().then();

    this.dialogRef.close({event: true, type: "login"})

    switch (this.User?.role) {
      case RoleEnum.administrator:
      case RoleEnum.mentor:
        await this.router.navigate([""]);
        break;
      case RoleEnum.subscriber:
      case RoleEnum.facilitator:
        await this.router.navigate(["/classes"])
        break;

      case RoleEnum.nonSubscriber:
        await this.router.navigate(["/renew"])
        break;
      default:
        await this.router.navigate([""])
    }
  }


  forgotPassword() {
    this.dialogRef.close({event: false, type: "password"})
  }

  signup() {
    this.dialogRef.close({event: false, type: "signup"})
  }


}
