import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from '../shared/components/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {UserListComponent} from './main/user-list/user-list.component';
import {StatsComponent} from './main/stats/stats.component';
import {MainDashboardComponent} from './main/main-dashboard.component';
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SharedModule} from "../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    ToolbarComponent,
    UserListComponent,
    StatsComponent,
    MainDashboardComponent
  ],
  exports: [
    ToolbarComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        MatSelectModule,
        MatMenuModule,
        MatListModule,
        MatTableModule,
        MatProgressBarModule,
        SharedModule,
        FlexLayoutModule,
    ]
})
export class DashboardModule {
}
