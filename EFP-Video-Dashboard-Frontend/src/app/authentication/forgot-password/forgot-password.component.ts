import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";
import {MatDialogRef} from "@angular/material/dialog";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordFormGroup: FormGroup;
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              public breakpointObserver: BreakpointObserver) {
    this.forgotPasswordFormGroup = this._formBuilder.group({
      email: ['', Validators.required]
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

  async submitEmail() {
    await this.authenticationService.forgotPassword(this.forgotPasswordFormGroup.get('email')?.value);
    this.dialogRef.close();
  }

}
