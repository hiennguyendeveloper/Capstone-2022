import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpErrorInterceptor} from "./core/interceptors/http-error.interceptor";
import {TestimonialComponent} from "./testimonial/testimonial/testimonial.component";
import {MainDashboardComponent} from "./dashboard/main/main-dashboard.component";
import {SectionsComponent} from "./class/sections/sections.component";
import {ModulesComponent} from "./class/modules/modules.component";
import {MentorRequestComponent} from "./mentor-requests/mentor-request/mentor-request.component";
import {EditModuleComponent} from "./direct-edit/edit-module/edit-module.component";
import {EditLessonComponent} from "./direct-edit/edit-lesson/edit-lesson.component";
import {LessonsComponent} from "./class/lessons/lessons.component";
import {UserDetailsComponent} from "./userdetails/UserDetails/user-details.component";
import {MainSettingsComponent} from "./settings/main-settings/main-settings.component";
import {LoginHelperComponent} from "./core/helpers/login-helper/login-helper.component";


const routes: Routes = [
  {
    path: "", component: MainDashboardComponent,  canActivate: [AuthGuard], data: {role: "administrator"}
  },
  {path: "testimonials", component: TestimonialComponent},
  {
    path: "sections/:class/:id/:linkId/:objectId",
    component: SectionsComponent,
    canActivate: [AuthGuard],
    data: {role: "administrator"}
  },
  {
    path: "modules/:class/:id/:linkId/:objectId",
    component: ModulesComponent,
    canActivate: [AuthGuard],
    data: {role: "administrator"}
  },
  {
    path: "module/:objectId",
    component: ModulesComponent,
    canActivate: [AuthGuard],
    data: {role: "administrator"}
  },
  {
    path: "mentorRequest",
    component: MentorRequestComponent,
    canActivate: [AuthGuard],
    data: {role: "administrator"}
  },
  {
    path: "direct-edit/module/:id",
    component: EditModuleComponent,
    canActivate: [AuthGuard],
    data: {role: "administrator"}
  },
  {
    path: "direct-edit/lesson/:id",
    component: EditLessonComponent,
    canActivate: [AuthGuard],
    data: {role: "administrator"}
  },
  {
    path: "lesson/:objectId",
    component: LessonsComponent,
    canActivate: [AuthGuard],
    data: {role: "administrator"}
  },
  {
    path: "userDetails/:userId",
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
    data: {role: "administrator"}
  },
  {
    path: "settings",
    component: MainSettingsComponent,
    canActivate: [AuthGuard],
    data: {role: "administrator"}
  },
  {
    path: "cypress-testing-login/:email/:password",
    component: LoginHelperComponent,
  },
  {path: "**", redirectTo: "testimonials"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ]
})
export class AppRoutingModule {
}
