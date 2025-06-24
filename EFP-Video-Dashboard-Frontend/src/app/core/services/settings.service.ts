/* istanbul ignore file */
import {Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../interfaces/UserInterface";
import {SectionInterface} from "../interfaces/SectionInterface";
import {ModuleInterface} from "../interfaces/ModuleInterface";
import {LessonInterface} from "../interfaces/LessonInterface";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  userList: UserInterface[];
  userListBS: BehaviorSubject<UserInterface[] | null>;

  sectionList: SectionInterface[];
  sectionListBS: BehaviorSubject<SectionInterface[] | null>;

  moduleList: ModuleInterface[];
  modulesListBS: BehaviorSubject<ModuleInterface[] | null>;

  lessonList: LessonInterface[];
  lessonListBS: BehaviorSubject<LessonInterface[] | null>;

  constructor(private httpClient: HttpClient) {
    this.userListBS = new BehaviorSubject<UserInterface[] | null>(null);
    this.sectionListBS = new BehaviorSubject<SectionInterface[] | null>(null);
    this.modulesListBS = new BehaviorSubject<ModuleInterface[] | null>(null);
    this.lessonListBS = new BehaviorSubject<LessonInterface[] | null>(null);

    this.userList = [];
    this.sectionList = [];
    this.moduleList = [];
    this.lessonList = [];
  }

  async GetDeletedUsers() {

    const obs = this.httpClient.get<UserInterface[]>(environment.baseApiUrl + "/settings/get-deleted-history/users");
    const userInterfaces = await lastValueFrom<UserInterface[]>(obs);

    if (userInterfaces == null) {
      return false;
    }

    this.userList = userInterfaces
    this.userListBS.next(this.userList);

    return true;
  }

  async GetDeletedSections() {

    const obs = this.httpClient.get<SectionInterface[]>(environment.baseApiUrl + "/settings/get-deleted-history/sections");
    const sectionInterfaces = await lastValueFrom<SectionInterface[]>(obs);

    if (sectionInterfaces == null) {
      return false;
    }

    this.sectionList = sectionInterfaces;
    this.sectionListBS.next(this.sectionList);

    return true;
  }

  async GetDeletedModules() {

    const obs = this.httpClient.get<ModuleInterface[]>(environment.baseApiUrl + "/settings/get-deleted-history/modules");
    const moduleInterfaces = await lastValueFrom<ModuleInterface[]>(obs);

    if (moduleInterfaces == null) {
      return false;
    }

    this.moduleList = moduleInterfaces;
    this.modulesListBS.next(this.moduleList);

    return true;
  }

  async GetDeletedLessons() {

    const obs = this.httpClient.get<LessonInterface[]>(environment.baseApiUrl + "/settings/get-deleted-history/lessons");
    const lessonInterfaces = await lastValueFrom<LessonInterface[]>(obs);

    if (lessonInterfaces == null) {
      return false;
    }

    this.lessonList = lessonInterfaces;
    this.lessonListBS.next(this.lessonList);

    return true;
  }

  /*=============================== Undo ====================================*/

  async undoUserDelete(id: number) {
    if (id == null)
      return null;

    const obs = this.httpClient.get<UserInterface[]>(environment.baseApiUrl + "/settings/undo-deleted-history/user/" + id);
    const userInterfaces = await lastValueFrom<UserInterface[]>(obs);

    if (userInterfaces == null) {
      return false;
    }

    this.userList = userInterfaces
    this.userListBS.next(this.userList);

    return true;

  }

  async undoSectionDelete(id: number) {
    if (id == null)
      return null;

    const obs = this.httpClient.get<SectionInterface[]>(environment.baseApiUrl + "/settings/undo-deleted-history/section/" + id);
    const sectionInterfaces = await lastValueFrom<SectionInterface[]>(obs);

    if (sectionInterfaces == null) {
      return false;
    }

    this.sectionList = sectionInterfaces
    this.sectionListBS.next(this.sectionList);

    return true;

  }

  async undoModuleDelete(id: number) {
    if (id == null)
      return null;

    const obs = this.httpClient.get<ModuleInterface[]>(environment.baseApiUrl + "/settings/undo-deleted-history/module/" + id);
    const moduleInterfaces = await lastValueFrom<ModuleInterface[]>(obs);

    if (moduleInterfaces == null) {
      return false;
    }

    this.moduleList = moduleInterfaces
    this.modulesListBS.next(this.moduleList);

    await this.GetDeletedSections();
    await this.GetDeletedLessons();

    return true;

  }

  async undoLessonDelete(id: number) {
    if (id == null)
      return null;

    const obs = this.httpClient.get<LessonInterface[]>(environment.baseApiUrl + "/settings/undo-deleted-history/lesson/" + id);
    const lessonInterfaces = await lastValueFrom<LessonInterface[]>(obs);

    if (lessonInterfaces == null) {
      return false;
    }

    this.lessonList = lessonInterfaces
    this.lessonListBS.next(this.lessonList);

    await this.GetDeletedModules();
    await this.GetDeletedSections();

    return true;

  }

  /*=============================== Delete Forever ====================================*/
  async foreverDeleteUser(id: number) {
    if (id == null)
      return null;

    const obs = this.httpClient.get<UserInterface[]>(environment.baseApiUrl + "/settings/forever-deleted-history/user/" + id);
    const userInterfaces = await lastValueFrom<UserInterface[]>(obs);

    if (userInterfaces == null) {
      return false;
    }

    this.userList = userInterfaces
    this.userListBS.next(userInterfaces);

    return true;
  }

  async foreverDeleteSection(id: number) {
    if (id == null)
      return null;

    const obs = this.httpClient.get<SectionInterface[]>(environment.baseApiUrl + "/settings/forever-deleted-history/section/" + id);
    const sectionInterfaces = await lastValueFrom<SectionInterface[]>(obs);

    if (sectionInterfaces == null) {
      return false;
    }

    this.sectionList = sectionInterfaces;
    this.sectionListBS.next(sectionInterfaces);

    await this.GetDeletedModules();
    await this.GetDeletedLessons();

    return true;
  }

  async foreverDeleteModule(id: number) {
    if (id == null)
      return null;

    const obs = this.httpClient.get<ModuleInterface[]>(environment.baseApiUrl + "/settings/forever-deleted-history/module/" + id);
    const moduleInterfaces = await lastValueFrom<ModuleInterface[]>(obs);

    if (moduleInterfaces == null) {
      return false;
    }

    this.moduleList = moduleInterfaces;
    this.modulesListBS.next(moduleInterfaces);

    await this.GetDeletedSections();
    await this.GetDeletedLessons();

    return true;
  }

  async foreverDeleteLesson(id: number) {
    if (id == null)
      return null;

    const obs = this.httpClient.get<LessonInterface[]>(environment.baseApiUrl + "/settings/forever-deleted-history/lesson/" + id);
    const lessonInterfaces = await lastValueFrom<LessonInterface[]>(obs);

    if (lessonInterfaces == null) {
      return false;
    }

    this.lessonList = lessonInterfaces;
    this.lessonListBS.next(lessonInterfaces);

    await this.GetDeletedModules();
    await this.GetDeletedSections();

    return true;
  }
}
