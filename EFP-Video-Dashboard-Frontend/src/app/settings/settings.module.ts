import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryComponent} from './history/history.component';
import {MainSettingsComponent} from './main-settings/main-settings.component';
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    HistoryComponent,
    MainSettingsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class SettingsModule {
}
