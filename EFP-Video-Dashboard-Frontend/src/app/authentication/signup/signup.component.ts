import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {UserAuthModel} from "../../core/models/UserAuthModel";
import {AuthenticationService} from "../../core/services/authentication.service";
import {MatDialogRef} from "@angular/material/dialog";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupFormGroup: FormGroup;
  public displayCheckEmail: boolean | null;
  public hidePassword: boolean;
  // user
  private userAuthenticationInfo: BehaviorSubject<UserAuthModel | null>;
  private User: UserAuthModel | null;
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<SignupComponent>,
              public breakpointObserver: BreakpointObserver) {
    this.userAuthenticationInfo = authenticationService.userAuthenticationInfo;
    this.User = null;
    this.displayCheckEmail = false;
    this.hidePassword = true;

    this.signupFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/)
        , Validators.maxLength(255)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
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

  async signup() {
    if (this.signupFormGroup.valid) {
      try {
        let result = await this.authenticationService.Signup(this.signupFormGroup).then();
        if (result) {
          this.displayCheckEmail = true;
          this.signupFormGroup.reset();
        }
      } catch (e) {
        console.log("Signup component error: " + e);
      }

    }

    this.dialogRef.close();
  }

  login() {
    this.dialogRef.close({event: false, type: "login"})
  }
}
