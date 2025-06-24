import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService} from "./core/services/authentication.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {NavigationLinkInterface} from "./core/interfaces/NavigationLinkInterface";
import {NavigationService} from "./core/services/navigation.service";
import {UserAuthModel} from "./core/models/UserAuthModel";
import {Location} from "@angular/common";
import {NewSectionDialogComponent} from "./dialogs/create-section-dialog/new-section-dialog.component";
import {SectionInterface} from "./core/interfaces/SectionInterface";
import {MatDialog} from "@angular/material/dialog";
import {ClassService} from "./core/services/class.service";
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  events: string[] = [];
  opened: boolean | undefined;
  appropriateClass: string = '';
  navLinks: BehaviorSubject<NavigationLinkInterface[] | null>;
  userInformationBS: BehaviorSubject<UserAuthModel | null>;

  title = 'EFP-Video-Dashboard-Frontend';
  public displaySideNav: boolean;
  displayBackButton: boolean;

  displayNavFullScreen:boolean;
  displayMobile:boolean;

  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  @ViewChild("sidenav") sidenav!: MatSidenav;

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private authService: AuthenticationService,
              private navService: NavigationService,
              public location: Location,
              public dialog: MatDialog,
              private router: Router,
              private classService: ClassService,
              public breakpointObserver: BreakpointObserver) {

    this.displayBackButton = true;
    this.navLinks = this.navService.NavLinksBS
    this.userInformationBS = this.authService.userAuthenticationInfo


    this.displaySideNav = true;
    this.displayNavFullScreen = false;

    this.matIconRegistry
      .addSvgIcon("smallLogo"
        , this.domSanitizer.bypassSecurityTrustResourceUrl("assets/successSeries.svg"));

    this.breakpointSubscription=this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]);
    this.breakpointSub = new Subscription();
    this.displayMobile= false;
  }


  ngOnInit(): void {

     this.breakpointSub = this.breakpointSubscription.subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        // handle XSmall breakpoint
        this.displayNavFullScreen = true;
        this.displayMobile = true;
      }
      if (result.breakpoints[Breakpoints.Small]) {
        // handle Small breakpoint
        this.displayNavFullScreen = false;
        this.displayMobile = false;
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        // handle Medium breakpoint
        this.displayNavFullScreen = false;
        this.displayMobile = false;
      }
      if (result.breakpoints[Breakpoints.Large]) {
        // handle Large breakpoint
        this.displayNavFullScreen = false;
        this.displayMobile = false;
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        // handle XLarge breakpoint
        this.displayNavFullScreen = false;
        this.displayMobile = false;
      }
    });




    this.authService.autoLogin().then();
    this.navService.getNavLinks().then();
    if (this.location.isCurrentPathEqualTo("/testimonials")) {
      this.displayBackButton = false;
    }

  }


  createASection() {
    const dialogRef = this.dialog.open(NewSectionDialogComponent, {
      width: 'auto',
      height: 'auto',
      maxWidth: '100vw',
      maxHeight: '100vh'
    });

    dialogRef.afterClosed().subscribe(async (result: SectionInterface) => {
      if (result != null) {
        await this.classService.putSection(result);
        await this.navService.populateNavLinks();
      }

    });
  }


  public async toggleSideNav(value: boolean) {
    await this
      .sidenav
      .toggle();
    this.displaySideNav = value;
  }

  back(): void {

    this.location.back()
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }
}
