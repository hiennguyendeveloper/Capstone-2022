import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthModel} from "../../core/models/UserAuthModel";
import {LessonInterface} from "../../core/interfaces/LessonInterface";
import {ClassService} from "../../core/services/class.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {NewLessonDialogComponent} from "../../dialogs/create-lesson-dialog/new-lesson-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {SnackBarService} from "../../core/services/snack-bar.service";

// noinspection DuplicatedCode
@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  baseImageUrl: string;
  userBS: BehaviorSubject<UserAuthModel | null>;
  lessonList: null | BehaviorSubject<LessonInterface[] | null>;
  private id: number | undefined;
  private class: String | undefined;
  private linkId: Number | undefined;
  private objectId: number | undefined;
  private sub: any;
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;
  public stack: Boolean;
  public randomImgSelector:number;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private classService: ClassService,
              public authService: AuthenticationService,
              public dialog: MatDialog,
              public breakpointObserver: BreakpointObserver,
              private snackBar: SnackBarService) {
    this.lessonList = this.classService.lessonListBS;
    this.userBS = this.authService.userAuthenticationInfo;
    this.baseImageUrl = environment.baseApiUrl + "/storage/files/";
    this.stack = false;
    //breakpoint
    this.breakpointSubscription=this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]);
    this.breakpointSub = new Subscription();
    this.randomImgSelector=0;

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.class = params['class']
      this.linkId = +params['linkId']
      this.objectId = +params['objectId']

      console.log("got here")
      this.updateLessonList().then();

    });

    this.breakpointSub = this.breakpointSubscription.subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        // handle XSmall breakpoint
        this.stack = true;

      }
      if (result.breakpoints[Breakpoints.Small]) {
        // handle Small breakpoint
        this.stack = false;

      }
      if (result.breakpoints[Breakpoints.Medium]) {
        // handle Medium breakpoint
        this.stack = false;

      }
      if (result.breakpoints[Breakpoints.Large]) {
        // handle Large breakpoint
        this.stack = false;

      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        // handle XLarge breakpoint
        this.stack = false;


      }
    });
  }

  randomImageGenerator(min: number, max: number) { // min and max included

    return "random"+Math.floor(Math.random() * (max - min + 1) + min) + ".png"
  }

  async updateLessonList() {
    let module;
    if(this.objectId != null) {
      module = await this.classService.getModule(this.objectId);
      this.lessonList = await this.classService.getLessons(this.objectId);
    }
    if(module == false){
      this.router.navigate(["/testimonials"]).then(()=>{
        this.snackBar.showSnackBarAlert("Unable to retrieve details", "error")
      })
    }

    this.lessonList?.value?.forEach( lesson =>{
      if (lesson.picture == null){
        lesson.picture = this.randomImageGenerator(1,5)
      }
    })
  }


  async createALesson() {
    let dialogRef = this.dialog.open(NewLessonDialogComponent, {
      width: 'auto',
      height: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(async (result: LessonInterface) => {
      if (this.objectId != null && result != null) {
        result.module = this.objectId!;
        this.classService.putLesson(result).then();
      }
    });
  }
}

