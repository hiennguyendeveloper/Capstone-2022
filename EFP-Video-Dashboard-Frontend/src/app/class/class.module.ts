import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModulesComponent} from './modules/modules.component';
import {LessonsComponent} from './lessons/lessons.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SectionsComponent} from './sections/sections.component';
import {PdfJsViewerModule} from "ng2-pdfjs-viewer";


@NgModule({
  declarations: [
    ModulesComponent,
    LessonsComponent,
    SectionsComponent

  ],
    imports: [
        CommonModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatListModule,
        MatIconModule,
        RouterModule,
        MatCardModule,
        FormsModule,
        MatDialogModule,
        FlexModule,
        MatProgressBarModule,
        PdfJsViewerModule
    ],
})
export class ClassModule {
}
