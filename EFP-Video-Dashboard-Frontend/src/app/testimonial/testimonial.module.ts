import {NgModule} from '@angular/core';
import {TestimonialComponent} from './testimonial/testimonial.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    TestimonialComponent
  ],
  imports: [
    FlexLayoutModule,
    MatDividerModule,
    CommonModule

  ]
})
export class TestimonialModule {
}
