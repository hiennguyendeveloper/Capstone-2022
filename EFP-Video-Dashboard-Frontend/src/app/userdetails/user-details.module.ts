import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {UserDetailsComponent} from "./UserDetails/user-details.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FlexModule,
    MatIconModule,
  ],
  providers: [TitleCasePipe,],
})
export class UserDetailsModule {
}
