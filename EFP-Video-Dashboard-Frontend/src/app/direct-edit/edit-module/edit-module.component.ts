import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {UploadFileService} from "../../core/services/upload-file.service";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {interval, lastValueFrom, map, Observable, Subscription, timeout} from "rxjs";
import {ClassService} from "../../core/services/class.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModuleInterface} from "../../core/interfaces/ModuleInterface";
import {environment} from "../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {ModuleDeleteComponent} from "../../dialogs/module-delete/module-delete.component";
import {NavigationService} from "../../core/services/navigation.service";
import {Location} from "@angular/common";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {

  @ViewChild('modulePhoto') modulePhoto: ElementRef | null;
  editModuleFormGroup: FormGroup;
  sub: any;
  moduleId: number | null;
  module: ModuleInterface | null;

  /*file upload fields*/
  progress = 0;
  file: File | null;
  fileStatus = {status: '', requestType: '', percent: 0};
  uploadComplete: boolean;
  fileSelected: boolean;
  baseImageUrl: string;
  stack: boolean;
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;


  constructor(private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private uploadFileService: UploadFileService,
              private snackBar: SnackBarService,
              private classService: ClassService,
              public dialogRef: MatDialog,
              private navService: NavigationService,
              public location: Location,
              public breakpointObserver: BreakpointObserver,
              private router:Router) {
    this.moduleId = null
    this.file = null;
    this.modulePhoto = null;
    this.uploadComplete = false;
    this.fileSelected = false;
    this.module = null;
    this.baseImageUrl = environment.baseApiUrl + "/storage/files/";
    this.stack = false;


    this.editModuleFormGroup = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(250)]],
      image: ['']
    });
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
      this.moduleId = +params['id']; // (+) converts string 'id' to a number
    });

    this.getInfo().then();

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

  /* istanbul ignore next */
  async submit() {

    if (this.editModuleFormGroup.valid && this.module != null) {
      if (this.fileSelected && this.file?.name != this.module.picture) {
        await this.upload();
      }

      let fileName = this.file?.name == undefined ? null : this.file!.name

      let moduleInterface = {
        id: this.module.id,
        moduleName: this.editModuleFormGroup.get('title')?.value,
        moduleDescription: this.editModuleFormGroup.get('description')?.value,
        dtmCreated: null,
        dtmUpdated: new Date,
        dtmDeleted: null,
        section: this.module.section,
        picture: fileName,
      }
      let result = await this.classService.updateModule(moduleInterface).then();
      if (result != null || result != false) {
        this.snackBar.showSnackBarAlert("Successfully Updated!", "success")
        this.module = moduleInterface;
        let kk = interval(2500).pipe(
          timeout({
            each: 2500
          })
        ).subscribe(() => {
          this.uploadComplete = false;
          kk.unsubscribe();
        });

      }
    }
    this.file = null;
    this.fileSelected = false;
    this.editModuleFormGroup.reset()
    this.getInfo().then();
  }

  /* istanbul ignore next */
  async upload() {
    this.progress = 0;
    const formData: FormData = new FormData();
    if (this.file == null) {
      this.snackBar.showSnackBarAlert("You must choose a file to upload", "error")
      return
    }

    formData.append('file', this.file);
    let xx = await (await this.uploadFileService.upload(formData)).pipe(map(event => {

        this.reportProgress(event)

      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }));
    await lastValueFrom(xx);
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
    this.fileSelected = !!this.file;
  }


  async getInfo() {
    if (this.moduleId == null) {
      this.snackBar.showSnackBarAlert("Unable to retrieve details", "error")
      return;
    }

    let val = await this.classService.getModule(this.moduleId);

    if (!val) {
      this.router.navigate(["/testimonials"]).then(()=>{
        this.snackBar.showSnackBarAlert("Unable to retrieve details", "error")
      })
      return;
    }

    this.module = val;
    this.editModuleFormGroup.patchValue({
      title: val.moduleName,
      description: val.moduleDescription,

    });

  }

  async deleteModule() {
    this.dialogRef.open(ModuleDeleteComponent, {
      height: 'auto',
      width: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw'
    }).afterClosed().subscribe(async response => {
      if (response == null)
        return;
      if (response.result==true) {
        await this.classService.deleteModule(this.moduleId!)
        await this.navService.getNavLinks()
        this.location.back();
      }
    });
  }

  /* istanbul ignore next */
  private reportProgress(httpEvent: HttpEvent<Object>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';

          this.modulePhoto!.nativeElement.value = null;
          this.uploadComplete = true
        }

        this.fileStatus.status = 'done';

        this.modulePhoto!.nativeElement.value = null;
        this.uploadComplete = true
        break;
      default:
        break;

    }
  }

  /* istanbul ignore next */
  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

}
