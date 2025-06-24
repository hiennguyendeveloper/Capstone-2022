import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {UserDetailsService} from "../../core/services/user-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleEnum} from "../../core/enum/RoleEnum";
import {BehaviorSubject, lastValueFrom, map} from "rxjs";
import {RoleModel} from "../../core/models/RoleModel";
import {UserInterfaceRoleModel} from "../../core/interfaces/UserInterfaceRoleModel";
import {Location, TitleCasePipe} from "@angular/common";
import {DeleteUserDialogComponent} from "../../dialogs/delete-user-dialog/delete-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../../core/services/authentication.service";
import {environment} from "../../../environments/environment";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {UploadFileService} from "../../core/services/upload-file.service";


@Component({
  selector: 'app-UserDetails',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  UserDetailsFormGroup: FormGroup;
  UserDetail: UserInterfaceRoleModel | null;
  UserDetailBS: BehaviorSubject<UserInterfaceRoleModel | null>;
  userId: number | null;
  hasChange: boolean;
  roles = [RoleEnum.administrator, RoleEnum.subscriber, RoleEnum.facilitator, RoleEnum.mentor, RoleEnum.nonSubscriber];
  ROLE_ENTRIES: String[];
  CurrentRole: number | null;
  sub: any;

  baseImageUrl: string

  /*file upload*/
  progress: number;
  file: File | null;
  fileStatus = {status: '', requestType: '', percent: 0};
  fileSelected: boolean;


  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private snackBar: SnackBarService,
    private userDetailsService: UserDetailsService,
    private router: Router,
    private titleCasePipe: TitleCasePipe,
    public dialogRef: MatDialog,
    public location: Location,
    private authService: AuthenticationService,
    private uploadFileService: UploadFileService,
  ) {
    /*file constructor*/
    this.file = null;
    this.progress = 0;
    this.fileSelected = false;

    this.userId = null;
    this.CurrentRole = null;
    this.ROLE_ENTRIES = [];
    this.hasChange = false;

    this.UserDetail = null
    this.UserDetailBS = new BehaviorSubject<UserInterfaceRoleModel | null>(null);

    this.baseImageUrl = environment.baseApiUrl + "/storage/files/";

    this.UserDetailsFormGroup = this._formBuilder.group({
      first_name: ['', [Validators.required, Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.maxLength(100)]],
      role: ['', Validators.required],
      email: ['', [Validators.required,
        Validators.maxLength(225),
        Validators.pattern(/(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/)
      ]],
      image: ['', [Validators.required]]
    })


  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId']; // (+) converts string 'id' to a number
    });

    for (const log in RoleEnum) {
      if (isNaN(Number(log))) {
        if (log == "nonSubscriber") {
          this.ROLE_ENTRIES.push("Non Subscriber")
        } else {
          this.ROLE_ENTRIES.push(this.titleCasePipe.transform(log));
        }
      }
    }

    this.getInfo().then(() => {
      this.onCreateGroupFormValueChange();
    });


  }

  async getInfo() {
    /* istanbul ignore next */
    if (this.userId == null) {
      this.snackBar.showSnackBarAlert("Unable to retrieve details", "error")
      return;
    }

    let val = await this.userDetailsService.getUserDetails(this.userId).then();
    /* istanbul ignore next */
    if (!val) {
      this.snackBar.showSnackBarAlert("Unable to retrieve details", "error")
      this.router.navigate(['/testimonials']).then();
      return;
    }


    this.UserDetail = this.userDetailsService.userDetails;
    this.UserDetailBS = this.userDetailsService.userDetailsBS;

    //populate drop-down from edit
    this.CurrentRole = this.UserDetailBS.value!.role.id

    this._formBuilder.group(this.UserDetailBS)
    this.UserDetailsFormGroup.patchValue({
      first_name: this.UserDetailBS.value!.first_name,
      last_name: this.UserDetailBS.value!.last_name,
      role: this.UserDetailBS.value!.role.role,
      email: this.UserDetailBS.value!.email

    })
  }

  /* istanbul ignore next */
  async submit() {
    if (this.UserDetailsFormGroup.valid) {

      let role = new RoleModel(this.UserDetailsFormGroup.get('role')!.value, this.UserDetailsFormGroup.get('role')!.value)

      if (!this.UserDetailsFormGroup.get('role')?.dirty) {
        role = this.UserDetailBS.value!.role
      }


      let fileName = this.file?.name == undefined ? null : this.file!.name

      const userRequestInterface = {
        id: this.UserDetailBS.value!.id,
        first_name: this.UserDetailsFormGroup.get("first_name")!.value,
        last_name: this.UserDetailsFormGroup.get("last_name")!.value,
        role: role,
        email: this.UserDetailsFormGroup.get("email")!.value,
        picture: fileName,
        progress: this.UserDetailBS.value!.progress,
        dtm_last_login: this.UserDetailBS.value!.dtm_last_login

      }

      let val = await this.userDetailsService.saveUserDetails(userRequestInterface).then();
      if (val) {
        this.snackBar.showSnackBarAlert("Successfully updated!", "success")
      } else {
        this.snackBar.showSnackBarAlert("Did not save successfully", "Error")
      }

      if (fileName!= null){
        await this.upload()
      }

      this.UserDetailsFormGroup.reset();
      await this.authService.getUserDetails();
      await this.getInfo();


    } else {
      this.snackBar.showSnackBarAlert("All fields are required", "error")
    }

  }


  onCreateGroupFormValueChange() {
    const initialValue = this.UserDetailsFormGroup.value
    this.UserDetailsFormGroup.valueChanges.subscribe(() => {
      this.hasChange = Object.keys(initialValue).some(key => this.UserDetailsFormGroup.value[key] !=
        initialValue[key])

    });
  }

  async deleteUser() {
    this.dialogRef.open(DeleteUserDialogComponent, {
      height: 'auto',
      width: 'auto',
      maxWidth: '100vw',
      maxHeight: '100vh'
    }).afterClosed().subscribe(async response => {
      if (response == null)
        return;
      if (response.result==true) {
        let result = await this.authService.deleteUser(this.userId!)
        if (result) {
          this.location.back();
        }


      }
    })

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
          this.file = null;
        }
        this.fileStatus.status = 'done';
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
