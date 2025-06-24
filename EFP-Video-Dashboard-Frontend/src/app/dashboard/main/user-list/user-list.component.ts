import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackBarService} from "../../../core/services/snack-bar.service";
import {BehaviorSubject, lastValueFrom, Observable, Subscription} from "rxjs";
import {RoleEnum} from "../../../core/enum/RoleEnum";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {UserAuthModel} from "../../../core/models/UserAuthModel";
import {environment} from "../../../../environments/environment";
import {UserInterface} from "../../../core/interfaces/UserInterface";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  theUsers: UserInterface[];
  displayedColumns: string[] = ['name', 'role', 'last_login', 'progress', 'edit'];
  RoleEnum = RoleEnum;
  userAuthenticationInfoBS: BehaviorSubject<UserAuthModel | null>;

  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(private httpclient: HttpClient,
              private snackBar: SnackBarService,
              private router: Router,
              private authService: AuthenticationService,
              public breakpointObserver: BreakpointObserver) {
    this.userAuthenticationInfoBS = this.authService.userAuthenticationInfo


    this.theUsers = [];

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
        this.displayedColumns = ['name', 'edit'];
      }
      if (result.breakpoints[Breakpoints.Small]) {
        // handle Small breakpoint
        this.displayedColumns = ['name', 'role', 'edit'];

      }
      if (result.breakpoints[Breakpoints.Medium]) {
        // handle Medium breakpoint
        this.displayedColumns = ['name', 'role', 'last_login','edit'];

      }
      if (result.breakpoints[Breakpoints.Large]) {
        // handle Large breakpoint
        this.displayedColumns = ['name', 'role', 'last_login','progress','edit'];
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        // handle XLarge breakpoint
        this.displayedColumns = ['name', 'role', 'last_login','progress','edit'];

      }
    });

    this.userAuthenticationInfoBS.subscribe(user => {
      if (user?.role == RoleEnum.administrator) {
        this.getUserList().then()
      } else {
        console.warn(`User role is not admin. it is: ${user?.role}`)
        this.router.navigate(["/testimonials"]).then(() => {
        })
      }
    })
  }


  editUser(id: number) {
    this.router.navigate(["/userDetails/", id]).then();
  }

  async getUserList() {
    try {
      const obs = this.httpclient.get<UserInterface[]>(environment.baseApiUrl + "/user/users");
      this.theUsers = await lastValueFrom<UserInterface[]>(obs);

    } catch (e) {

      this.router.navigate(["/testimonials"]).then();


    }

  }


}
