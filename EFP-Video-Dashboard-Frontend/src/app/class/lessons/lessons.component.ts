
import {ActivatedRoute, Router} from "@angular/router";
import {ClassService} from "../../core/services/class.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {VideoListInterface} from "../../core/interfaces/VideoListInterface";
import {LessonInterface} from "../../core/interfaces/LessonInterface";
import {Instance} from "../../core/helpers/instance";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {environment} from "../../../environments/environment";
import {ModuleInterface} from "../../core/interfaces/ModuleInterface";
import {DomSanitizer} from "@angular/platform-browser";
import {WorkbookInterface} from "../../core/interfaces/WorkbookInterface";
import {Component, OnInit} from "@angular/core";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  lesson:LessonInterface;
  module:ModuleInterface;
  workbook:WorkbookInterface|null;
  video:VideoListInterface|null;

  workbookPath:string;

  displayVideo: boolean;
  displayWorkbook: boolean;
  displayPicture:boolean;


  private id: number | undefined;
  private class: String | undefined;
  private linkId: Number | undefined;
  private objectId: number | undefined;
  private sub: any;

  baseImageUrl: string;

  stack:boolean;

  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;


  constructor(private route: ActivatedRoute,
              private classService: ClassService,
              public authService: AuthenticationService,
              private router:Router,
              private snackBar:SnackBarService,
              public sanitizer:DomSanitizer,
              public breakpointObserver: BreakpointObserver) {
    this.baseImageUrl = environment.baseApiUrl + "/storage/files/";

    this.lesson = {
      id:null,
      lessonName:"",
      dtmCreated:null,
      dtmUpdated:null,
      dtmDeleted:null,
      module:null,
      video:null,
      workbook:null,
      picture:null
    };

    this.module ={
      id:null,
      moduleName:"",
      moduleDescription:null,
      picture:null,
      dtmCreated:null,
      dtmUpdated:null,
      dtmDeleted:null,
      section:null
    }

    this.workbook = null;
    this.video = null;
    this.workbookPath='';

    this.displayVideo = true
    this.displayWorkbook = true;
    this.displayPicture = true;

    this.breakpointSubscription=this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]);
    this.breakpointSub = new Subscription();
    this.stack = false;
  }

  ngOnInit(): void {

    this.breakpointSub = this.breakpointSubscription.subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        // handle XSmall breakpoint
        this.stack = true;
      }
      if (result.breakpoints[Breakpoints.Small]) {
        // handle Small breakpoint
        this.stack = true;
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

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.class = params['class']
      this.linkId = +params['linkId']
      this.objectId = +params['objectId']

      this.getLesson().then();
    })
  }


  async getLesson(){
    if (this.objectId != undefined) {
      const lesson = await this.classService.getLesson(this.objectId)
      if (Instance.isInstanceOfLessonInterface(lesson)) {
        this.lesson = lesson
      }else {
        this.router.navigate(["/testimonials"]).then(()=>{
          this.snackBar.showSnackBarAlert("Unable to retrieve lesson","error")
        })
      }

      if (this.lesson?.picture == null){
        this.displayPicture = false
      }

      if (this.lesson?.workbook == null){
        this.displayWorkbook = false
      }

      if (this.lesson?.video == null){
        this.displayVideo = false;
      }

      this.workbook=this.lesson.workbook
      this.video = this.lesson.video
      if (this.workbook?.workbookPath != null)
        this.workbookPath = this.baseImageUrl+ this.workbook.workbookPath

    }
    if (Instance.isInstanceOfModuleInterface(this.lesson.module)){
      const module1 = await this.classService.getModule(this.lesson.module.id)
      if (Instance.isInstanceOfModuleInterface(module1)){
        this.module=module1;
      }
    }
    else {
      const module2 = await this.classService.getModule(this.lesson.module)
      if (Instance.isInstanceOfModuleInterface(module2)){
        this.module=module2;
      }
    }
    console.warn(this.workbookPath)

      this.workbook=this.lesson.workbook
      this.video = this.lesson.video
      if (this.workbook?.workbookPath != null) {
        this.workbookPath = this.baseImageUrl + this.workbook.workbookPath
    }
    if (Instance.isInstanceOfModuleInterface(this.lesson.module)){
      const module1 = await this.classService.getModule(this.lesson.module.id)
      if (Instance.isInstanceOfModuleInterface(module1)){
        this.module=module1;
      }
    }
    else {
      const module2 = await this.classService.getModule(this.lesson.module)
      if (Instance.isInstanceOfModuleInterface(module2)){
        this.module=module2;
      }
    }
    console.warn(this.workbookPath)

  }

  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.baseImageUrl+this.workbookPath);
  }
}
