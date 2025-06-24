import {NgModule} from "@angular/core";
import {MentorRequestComponent} from "./mentor-request/mentor-request.component";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    MentorRequestComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,

  ]

})
export class MentorRequestModule {
}
