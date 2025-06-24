import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SectionDeleteComponent} from "../../dialogs/section-delete/section-delete.component";
import {NavigationService} from "../../core/services/navigation.service";
import {ClassService} from "../../core/services/class.service";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

  editSectionFormGroup: FormGroup;
  sub: any;
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditSectionComponent>,
              private deleteDialog: MatDialog,
              private navService: NavigationService,
              private classService: ClassService,
              private router: Router,
              public breakpointObserver: BreakpointObserver,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.editSectionFormGroup = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
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

  async submitFunc() {
    if (this.editSectionFormGroup.valid) {
      let sectionInterface = {
        id: null,
        sectionName: this.editSectionFormGroup.get('title')?.value,
        dtmCreated: null,
        dtmUpdated: new Date,
        dtmDeleted: null
      }
      this.dialogRef.close(sectionInterface)
    }
  }

  async deleteSection() {

    this.deleteDialog.open(SectionDeleteComponent, {
      height: 'auto',
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: 'auto',
    }).afterClosed().subscribe(async response => {
      if (response == null)
        return;
      if (response.result==true) {
        await this.classService.deleteSection(this.data.sectionId)
        await this.navService.populateNavLinks();
        await this.navService.getNavLinks()
        this.dialogRef.close();
        await this.router.navigate(["/"])

      }
    });

  }


}
