import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../../authentication/login/login.component";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {SnackBarService} from "../../../core/services/snack-bar.service";
import {UserAuthModel} from "../../../core/models/UserAuthModel";
import {ForgotPasswordComponent} from "../../../authentication/forgot-password/forgot-password.component";
import {SignupComponent} from "../../../authentication/signup/signup.component";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {UserInterface} from "../../../core/interfaces/UserInterface";
import {environment} from "../../../../environments/environment";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Output() sideNavEvent: EventEmitter<boolean>;
  public userInformationBS: BehaviorSubject<UserAuthModel | null>;
  userDetailsBS: BehaviorSubject<UserInterface | null>;
  baseImageUrl: string;
  public sideNavState: boolean;

  //breakpoint
  displaySearchBar:boolean;
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(public dialog: MatDialog,
              private authService: AuthenticationService,
              private snackbarService: SnackBarService,
              public breakpointObserver: BreakpointObserver) {

    this.userInformationBS = authService.userAuthenticationInfo;
    this.userDetailsBS = this.authService.userDetailInfoBS;

    this.baseImageUrl = environment.baseApiUrl + "/storage/files/";

    this.sideNavEvent = new EventEmitter<boolean>()
    this.sideNavState = false;

    this.displaySearchBar = true;

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
          this.displaySearchBar = false;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          // handle Small breakpoint
          this.displaySearchBar = true;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          // handle Medium breakpoint
          this.displaySearchBar = true;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          // handle Large breakpoint
          this.displaySearchBar = true;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          // handle XLarge breakpoint
          this.displaySearchBar = true;
        }
      });



    this.authService.getUserDetails().then();
  }

  public toggleSideNav() {

    this.sideNavState = !this.sideNavState;

    this.sideNavEvent
      .emit(this.sideNavState);
  }

  public login() {
    let loginDialog = this.dialog.open(LoginComponent, {
      height: 'auto',
      width: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw'
    });


    loginDialog.afterClosed().subscribe((result) => {


      if (result.event == true && result.type == "login" && this.authService.userAuthenticationInfo.value) {
        this.snackbarService.showSnackBarAlert("You have successfully logged in!", "success", 5000)
      } else if (result.event == false && result.type == "password") {
        this.dialog.open(ForgotPasswordComponent, {
          height: 'auto',
          width: 'auto',
          maxHeight: '100vh',
          maxWidth: '100vw'
        });
      } else if (result.event == false && result.type == "signup") {
        this.dialog.open(SignupComponent, {
          height: 'auto',
          width: 'auto',
          maxHeight: '100vh',
          maxWidth: '100vw'
        });
      } else if (result.event == false && result.type == "login") {
        this.dialog.open(LoginComponent, {
          height: 'auto',
          width: 'auto',
          maxHeight: '100vh',
          maxWidth: '100vw'
        });
      }

    })
  }

  public logout() {
    this.authService.logout()
    this.snackbarService.showSnackBarAlert("You have successfully logged out.", "success", 5000)
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }

}
