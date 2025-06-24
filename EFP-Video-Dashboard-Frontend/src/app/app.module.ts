import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "./approuting.module";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {ClassModule} from "./class/class.module";
import {MatDialogModule} from "@angular/material/dialog";
import {AuthenticationModule} from "./authentication/authentication.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {DirectEditModule} from "./direct-edit/direct-edit.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UserDetailsModule} from "./userdetails/user-details.module";
import {DialogsModule} from "./dialogs/dialogs.module";
import {SettingsModule} from "./settings/settings.module";
import {TestimonialModule} from "./testimonial/testimonial.module";
import {CommonModule} from "@angular/common";
import {PdfJsViewerModule} from "ng2-pdfjs-viewer";
import {NgModule} from "@angular/core";
import {MentorRequestModule} from "./mentor-requests/mentor-request.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AuthenticationModule,
    ClassModule,
    UserDetailsModule,
    DirectEditModule,
    SettingsModule,
    TestimonialModule,
    MentorRequestModule,
    DialogsModule,
    MatSnackBarModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    AppRoutingModule,
    FlexModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    PdfJsViewerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
