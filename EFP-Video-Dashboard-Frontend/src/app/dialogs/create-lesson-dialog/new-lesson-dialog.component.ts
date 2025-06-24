import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LessonInterface} from "../../core/interfaces/LessonInterface";
import {MatDialogRef} from "@angular/material/dialog";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-create-lesson-dialog',
  templateUrl: './new-lesson-dialog.component.html',
  styleUrls: ['./new-lesson-dialog.component.scss']
})
export class NewLessonDialogComponent implements OnInit {
  newLesson: string
  public newLessonFormGroup: FormGroup;
  lessonInterface: LessonInterface;
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewLessonDialogComponent>,
              private breakpointObserver: BreakpointObserver) {
    this.newLesson = "";
    this.lessonInterface = {
      id: 0,
      lessonName: "",
      dtmCreated: null,
      dtmUpdated: null,
      dtmDeleted: null,
      module: 0,
      video: null,
      workbook: null,
      picture: null
    }
    this.newLessonFormGroup = this._formBuilder.group({
      newLesson: ['', Validators.required]
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
    if (this.newLessonFormGroup.valid && this.newLessonFormGroup.get('newLesson')?.value != null) {

      this.lessonInterface = {
        id: 0,
        lessonName: this.newLessonFormGroup.get('newLesson')?.value,
        dtmCreated: new Date,
        dtmUpdated: new Date,
        dtmDeleted: null,
        module: 0,
        video: null,
        workbook: null,
        picture: null
      }
      this.dialogRef.close(this.lessonInterface)
    }
  }

}
