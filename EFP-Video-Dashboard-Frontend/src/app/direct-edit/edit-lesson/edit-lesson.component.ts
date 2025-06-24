import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadFileService} from "../../core/services/upload-file.service";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassService} from "../../core/services/class.service";
import {MatDialog} from "@angular/material/dialog";
import {NavigationService} from "../../core/services/navigation.service";
import {Location} from "@angular/common";
import {LessonInterface} from "../../core/interfaces/LessonInterface";
import {environment} from "../../../environments/environment";
import {Observable, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {LessonDeleteComponent} from "../../dialogs/lesson-delete/lesson-delete.component";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent implements OnInit {
  editLessonFormGroup: FormGroup;
  sub: any;
  lessonId: number | null;
  lesson: LessonInterface | null;

  imageFile: File | null;
  workbookFile: File | null;
  videoFile: File | null;
  videoSelected: boolean;
  workbookSelected: boolean;
  imageSelected: boolean;
  baseImageUrl: string;

  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;


  imageFileStatus = {status: '', requestType: '', percent: 0};
  workbookFileStatus = {status: '', requestType: '', percent: 0};
  videoFileStatus = {status: '', requestType: '', percent: 0};


  progress = 0;
  //style
  stack: boolean;
  previewSize:boolean

  constructor(private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private uploadFileService: UploadFileService,
              private snackBar: SnackBarService,
              private classService: ClassService,
              public dialogRef: MatDialog,
              private navService: NavigationService,
              private location: Location,
              public router: Router,
              public breakpointObserver: BreakpointObserver) {

    this.lessonId = null
    this.baseImageUrl = environment.baseApiUrl + "/storage/files/";


    this.imageFile = null;
    this.workbookFile = null;
    this.videoFile = null;

    this.imageSelected = false;
    this.videoSelected = false;
    this.workbookSelected = false;
    this.lesson = null;

    //style
    this.stack = false;
    this.previewSize=false;





    this.editLessonFormGroup = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      video: ['', [Validators.required]],
      videoTitle: ['', [Validators.maxLength(250)]],
      workbook: ['', [Validators.required]],
      workbookTitle: ['', [Validators.required, Validators.maxLength(50)]],
      image: ['',]


    })
    this.breakpointSubscription=this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]);
    this.breakpointSub = new Subscription();

  }

  /* istanbul ignore next */
  private static reportProgress(httpEvent: HttpEvent<Object>, file: File | null, fileStatus: { status: string, requestType: string, percent: number }): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        EditLessonComponent.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ', fileStatus);
        break;
      case HttpEventType.DownloadProgress:
        EditLessonComponent.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ', fileStatus);
        break;
      case HttpEventType.ResponseHeader:

        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          fileStatus!.status = 'done';
          file = null;
        }
        fileStatus!.status = 'done';
        break;
      default:
        break;

    }
  }

  /* istanbul ignore next */
  private static updateStatus(loaded: number, total: number, requestType: string, fileStatus: { status: string, requestType: string, percent: number }): void {
    fileStatus.status = 'progress';
    fileStatus.requestType = requestType;
    fileStatus.percent = Math.round(100 * loaded / total);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.lessonId = +params['id']; // (+) converts string 'id' to a number
    });

    this.getInfo().then();
    console.log(this.lesson)

    this.breakpointSub = this.breakpointSubscription.subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        // handle XSmall breakpoint
        this.stack = true;
        this.previewSize = false
      }
      if (result.breakpoints[Breakpoints.Small]) {
        // handle Small breakpoint
        this.stack = true;
        this.previewSize = false
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        // handle Medium breakpoint
        this.stack = false;
        this.previewSize = true
      }
      if (result.breakpoints[Breakpoints.Large]) {
        // handle Large breakpoint
        this.stack = false;
        this.previewSize = true
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        // handle XLarge breakpoint
        this.stack = false;
        this.previewSize = true
      }
    });
  }

  /* istanbul ignore next */
  async submit() {
    console.log(this.lesson)
    if (this.lesson != null) {

      this.lesson.lessonName = this.editLessonFormGroup.get("title")?.value
      if (this.imageSelected && this.imageFile != null) {
        await this.upload(this.imageFile, this.imageFileStatus);
        this.lesson.picture = this.imageFile.name
      }
      if (this.workbookSelected && this.workbookFile != null && this.editLessonFormGroup.get("workbookTitle")?.value != null) {
        this.upload(this.workbookFile, this.workbookFileStatus);
        this.lesson.workbook = {
          id: null,
          workbookName: this.editLessonFormGroup.get('workbookTitle')!.value,
          workbookPath: this.workbookFile!.name,
          dtmCreated: null,
          dtmUpdated: new Date(),
          dtmDeleted: null
        }
      }
      if (this.videoSelected && this.videoFile != null) {
        await this.upload(this.videoFile, this.videoFileStatus);
        this.lesson.video = {
          id: null,
          videoName: this.editLessonFormGroup.get('videoTitle')!.value,
          videoDescription: null,
          videoPath: this.videoFile.name,
          dtmCreated: new Date(),
          dtmUpdated: new Date(),
          dtmDeleted: null
        }
      }

     await this.saveForm()

    }
    this.getInfo().then();

  }

  /* istanbul ignore next */
  async saveForm(){
    if (this.lesson!= null) {
      let result = this.classService.updateLesson(this.lesson);
      if (!result)
        this.snackBar.showSnackBarAlert("Unable to save Lesson.", "error")
      else
        this.snackBar.showSnackBarAlert("Successfully saved Lesson.", "success")
    }
  }

  async getInfo() {
    if (this.lessonId == null) {
      this.snackBar.showSnackBarAlert("Unable to retrieve details", "error")
      return;
    }

    let val = await this.classService.getLesson(this.lessonId);

    if (!val) {
      this.router.navigate(["/testimonials"]).then(()=>{
        this.snackBar.showSnackBarAlert("Unable to retrieve details", "error")
      })
      return;
    }

    if (val.workbook) {
      console.log("workbook: " + val.workbook)
      this.editLessonFormGroup.patchValue({
        /*   workbook: val.workbook?.workbookPath,*/
        workbookTitle: val.workbook?.workbookName
      });
    }
    if (val.video) {
      console.log("video: " + val.video)
      this.editLessonFormGroup.patchValue({
        /*  video: val.video?.videoPath,*/
        videoTitle: val.video?.videoName
      });
    }

    this.editLessonFormGroup.patchValue({
      title: val.lessonName
    });

    this.lesson = val;

    console.log(this.lesson)
  }

  /* istanbul ignore next */
  upload(file: File, fileStatus: { status: string, requestType: string, percent: number }) {
    this.progress = 0;
    const formData: FormData = new FormData();
    if (file != null) {
      formData.append('file', file);

      this.uploadFileService.upload(formData).subscribe(event => {
          EditLessonComponent.reportProgress(event, file, fileStatus);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    } else {
      this.snackBar.showSnackBarAlert("You must choose a file to upload", "error")
    }
  }

  selectImage(event: any) {
    this.imageFile = event.target.files[0];
    this.imageSelected = !!this.imageFile;
  }

  selectWorkbook(event: any) {
    this.workbookFile = event.target.files[0];
    this.workbookSelected = !!this.workbookFile;
  }

  selectVideo(event: any) {
    this.videoFile = event.target.files[0];
    this.videoSelected = !!this.videoFile;
  }

  async deleteLesson() {
    this.dialogRef.open(LessonDeleteComponent, {
      height: 'auto',
      width: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw'
    }).afterClosed().subscribe(async response => {
      if (response == null)
        return;
      if (response.result==true) {
        await this.classService.deleteLesson(this.lessonId!)
        await this.navService.getNavLinks()
        this.location.back();
      }
    });
  }


}
