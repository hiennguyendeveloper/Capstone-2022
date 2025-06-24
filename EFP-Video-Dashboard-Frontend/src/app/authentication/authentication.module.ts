import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {NewSectionDialogComponent} from "../dialogs/create-section-dialog/new-section-dialog.component";
import {NewModuleDialogComponent} from '../dialogs/create-module-dialog/new-module-dialog.component';
import {NewLessonDialogComponent} from '../dialogs/create-lesson-dialog/new-lesson-dialog.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    NewSectionDialogComponent,
    NewModuleDialogComponent,
    NewLessonDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
    RouterModule,
  ],
  entryComponents: [LoginComponent, NewSectionDialogComponent]
})
export class AuthenticationModule {
}
