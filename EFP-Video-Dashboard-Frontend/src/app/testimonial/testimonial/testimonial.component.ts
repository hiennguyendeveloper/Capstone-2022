import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  baseImageUrl: string;
  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;
  public stack: Boolean;

  constructor(public breakpointObserver: BreakpointObserver) {
    this.baseImageUrl = environment.baseApiUrl + "/storage/videos/testimonials/Testimonials.mp4";
    //breakpoint
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
  }

}
