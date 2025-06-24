import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../core/services/class.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModuleInterface} from "../../core/interfaces/ModuleInterface";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {UserAuthModel} from "../../core/models/UserAuthModel";
import {AuthenticationService} from "../../core/services/authentication.service";
import {environment} from "../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {NavigationService} from "../../core/services/navigation.service";
import {NewModuleDialogComponent} from "../../dialogs/create-module-dialog/new-module-dialog.component";
import {EditSectionComponent} from "../../direct-edit/edit-section/edit-section.component";
import {SectionInterface} from "../../core/interfaces/SectionInterface";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {SnackBarService} from "../../core/services/snack-bar.service";

// noinspection DuplicatedCode
@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  baseImageUrl: string;
  userBS: BehaviorSubject<UserAuthModel | null>;
  moduleList: null | BehaviorSubject<ModuleInterface[] | null>;
  private id: number | undefined;
  private class: String | undefined;
  private linkId: Number | undefined;
  private objectId: number | undefined;
  private sub: any;
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;
  public stack: Boolean;
  public mobileCard: Boolean;

  constructor(private route: ActivatedRoute,
              private classService: ClassService,
              public authService: AuthenticationService,
              public dialog: MatDialog,
              private navService: NavigationService,
              private router: Router,
              private snackBar: SnackBarService,
              public breakpointObserver: BreakpointObserver) {
    this.moduleList = this.classService.moduleListBS;
    this.userBS = this.authService.userAuthenticationInfo;
    this.baseImageUrl = environment.baseApiUrl + "/storage/files/";
    this.stack = false;
    this.mobileCard = false;

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
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.class = params['class']
      this.linkId = +params['linkId']
      this.objectId = +params['objectId']

      this.updateModuleList().then();

      this.breakpointSub = this.breakpointSubscription.subscribe(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          // handle XSmall breakpoint
          this.stack = true;
          this.mobileCard = true;

        }
        if (result.breakpoints[Breakpoints.Small]) {
          // handle Small breakpoint
          this.stack = false;
          this.mobileCard = false;

        }
        if (result.breakpoints[Breakpoints.Medium]) {
          // handle Medium breakpoint
          this.stack = false;
          this.mobileCard = false;

        }
        if (result.breakpoints[Breakpoints.Large]) {
          // handle Large breakpoint
          this.stack = false;
          this.mobileCard = false;

        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          // handle XLarge breakpoint
          this.stack = false;
          this.mobileCard = false;


        }
      });
    });


  }

  async updateModuleList() {
    let section;
    if(this.objectId != null) {
      section = await this.classService.getSection(this.objectId);
      this.moduleList = await this.classService.getModules(this.objectId);
    }
    if(section == false){
      this.router.navigate(["/testimonials"]).then(()=>{
        this.snackBar.showSnackBarAlert("Unable to retrieve details", "error")
      })
    }
    if (this.moduleList?.value == null) {
      await this.router.navigate(["/testimonials"]);
    }
    this.moduleList?.value?.forEach( module =>{
      if (module.picture == null){
        module.picture = this.randomImageGenerator(1,5)
      }
    })
  }
  randomImageGenerator(min: number, max: number) { // min and max included

    return "random"+Math.floor(Math.random() * (max - min + 1) + min) + ".png"
  }

  async updateSection() {
    this.dialog.open(EditSectionComponent, {
      width: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw',
      height: 'auto',
      data: {sectionId: this.objectId}
    }).afterClosed().subscribe(async (result: SectionInterface) => {
      if (this.objectId != null && result != null) {
        result.id = this.objectId;
        await this.classService.updateSection(result);
        await this.navService.populateNavLinks();
        await this.navService.getNavLinks();
      }


    })

  }

  async getInfo() {

  }


  createModule() {
    const dialogRef = this.dialog.open(NewModuleDialogComponent, {
      width: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result: ModuleInterface) => {
      if (this.objectId != null && result != null) {
        result.section = this.objectId!;
        this.classService.putModule(result).then();
      }
    });
  }


}
