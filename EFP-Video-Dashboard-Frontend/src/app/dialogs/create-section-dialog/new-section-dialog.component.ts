import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SectionInterface} from "../../core/interfaces/SectionInterface";
import {Observable, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-create-section-dialog',
  templateUrl: './new-section-dialog.component.html',
  styleUrls: ['./new-section-dialog.component.scss']
})

export class NewSectionDialogComponent implements OnInit {
  newSection: string;
  public newSectionFormGroup: FormGroup;
  sectionInterface: SectionInterface;
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;


  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewSectionDialogComponent>,
              public breakpointObserver: BreakpointObserver) {
    this.newSection = "";
    this.sectionInterface = {
      id: null,
      sectionName: "",
      dtmCreated: null,
      dtmUpdated: null,
      dtmDeleted: null

    }
    this.newSectionFormGroup = this._formBuilder.group({
      newSection: ['', Validators.required],
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
    if (this.newSectionFormGroup.valid && this.newSectionFormGroup.get('newSection')?.value != null) {

      this.sectionInterface = {
        id: null,
        sectionName: this.newSectionFormGroup.get('newSection')?.value,
        dtmCreated: new Date(),
        dtmUpdated: new Date(),
        dtmDeleted: null
      }

      this.dialogRef.close(this.sectionInterface)
    }

  }


}



