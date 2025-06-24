import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditModuleComponent} from './edit-module/edit-module.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    EditModuleComponent,
    EditLessonComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,
        FlexModule,
        MatDividerModule,
        MatCardModule,
        MatProgressSpinnerModule
    ]
})
export class DirectEditModule {
}
