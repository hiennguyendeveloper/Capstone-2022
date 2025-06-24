import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ModuleInterface} from "../../core/interfaces/ModuleInterface";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-create-module-dialog',
  templateUrl: './new-module-dialog.component.html',
  styleUrls: ['./new-module-dialog.component.scss']
})
export class NewModuleDialogComponent implements OnInit {
  newModule: string;
  public newModuleFormGroup: FormGroup;
  moduleInterface: ModuleInterface;
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewModuleDialogComponent>,
              public breakpointObserver: BreakpointObserver) {
    this.newModule = "";
    this.moduleInterface = {
      id: 0,
      moduleName: "",
      moduleDescription: null,
      dtmCreated: null,
      dtmUpdated: null,
      dtmDeleted: null,
      section: null,
      picture: null

    }
    this.newModuleFormGroup = this._formBuilder.group({
      newModule: ['', Validators.required]
    })
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

  callingFunc() {
    this.dialogRef.close(false);
  }

  async submitFunc() {
    new Date(Date.now());
    if (this.newModuleFormGroup.valid && this.newModuleFormGroup?.get('newModule')?.value != null) {
      this.moduleInterface = {
        id: 0,
        moduleName: this.newModuleFormGroup.get('newModule')?.value,
        moduleDescription: null,
        dtmCreated: new Date,
        dtmUpdated: new Date,
        dtmDeleted: null,
        section: null,
        picture: null
      }
      this.dialogRef.close(this.moduleInterface)
    }

  }


}
