import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import { LoginHelperComponent } from './helpers/login-helper/login-helper.component';

@NgModule({
  declarations: [
    LoginHelperComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: []
})
export class CoreModule {
}
