import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnackBarAlertComponent} from './components/snack-bar-alert/snack-bar-alert.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DateAgoPipe} from './pipes/date-ago.pipe';


@NgModule({
  declarations: [
    SnackBarAlertComponent,
    DateAgoPipe,
  ],
  exports: [
    DateAgoPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,

  ]
})
export class SharedModule {
}
