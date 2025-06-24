import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-section-delete',
  templateUrl: './section-delete.component.html',
  styleUrls: ['./section-delete.component.scss']
})
export class SectionDeleteComponent implements OnInit {
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(public dialogRef: MatDialogRef<SectionDeleteComponent>,
              public breakpointObserver: BreakpointObserver) {
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

  yes() {
    this.dialogRef.close({result: true});
  }

  no() {
    this.dialogRef.close({result: false});
  }

}
