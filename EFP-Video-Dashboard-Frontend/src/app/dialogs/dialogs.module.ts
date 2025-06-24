import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SectionDeleteComponent} from './section-delete/section-delete.component';
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {ModuleDeleteComponent} from './module-delete/module-delete.component';
import {EditSectionComponent} from '../direct-edit/edit-section/edit-section.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {LessonDeleteComponent} from './lesson-delete/lesson-delete.component';
import {DeleteUserDialogComponent} from './delete-user-dialog/delete-user-dialog.component';


@NgModule({
  declarations: [
    SectionDeleteComponent,
    ModuleDeleteComponent,
    EditSectionComponent,
    LessonDeleteComponent,
    DeleteUserDialogComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class DialogsModule {
}
