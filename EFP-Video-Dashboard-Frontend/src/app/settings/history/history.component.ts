import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from "../../core/services/settings.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {UserInterface} from "../../core/interfaces/UserInterface";
import {SectionInterface} from "../../core/interfaces/SectionInterface";
import {ModuleInterface} from "../../core/interfaces/ModuleInterface";
import {LessonInterface} from "../../core/interfaces/LessonInterface";
import {MatAccordion} from "@angular/material/expansion";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {NavigationService} from "../../core/services/navigation.service";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  userHistory: UserInterface[];
  userHistoryBS: BehaviorSubject<UserInterface[] | null>;

  sectionHistory: SectionInterface[];
  sectionHistoryBS: BehaviorSubject<SectionInterface[] | null>;

  modulesHistory: ModuleInterface[];
  modulesHistoryBS: BehaviorSubject<ModuleInterface[] | null>;

  lessonHistory: LessonInterface[];
  lessonHistoryBS: BehaviorSubject<LessonInterface[] | null>;

  displayedColumnsUsers: string[] = ['name', 'email', 'role', 'last_login', 'undo', 'delete'];
  displayedColumnsSection: string[] = ['sectionName', 'dtmCreated', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];
  displayedColumnsModule: string[] = ['moduleName', 'dtmCreated', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];
  displayedColumnsLesson: string[] = ['lessonName', 'dtmCreated', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];


  //breakpoint
  private breakpointSubscription: Observable<BreakpointState>;
  private breakpointSub: Subscription;

  constructor(private settingService: SettingsService,
              private snackBar: SnackBarService,
              private navService: NavigationService,
              public breakpointObserver: BreakpointObserver) {
    this.userHistory = [];
    this.userHistoryBS = settingService.userListBS;

    this.sectionHistory = [];
    this.sectionHistoryBS = settingService.sectionListBS;

    this.modulesHistory = [];
    this.modulesHistoryBS = settingService.modulesListBS;

    this.lessonHistory = [];
    this.lessonHistoryBS = settingService.lessonListBS;

    //breakpoint
    this.breakpointSubscription=this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]);
    this.breakpointSub = new Subscription();

  }

  ngOnInit(): void {
    this.getHistory().then();

    this.breakpointSub = this.breakpointSubscription.subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        // handle XSmall breakpoint
        this.displayedColumnsUsers = ['name', 'undo', 'delete'];
        this.displayedColumnsSection = ['sectionName', 'undo', 'delete'];
        this.displayedColumnsModule = ['moduleName', 'undo', 'delete'];
        this.displayedColumnsLesson = ['lessonName', 'undo', 'delete'];
      }
      if (result.breakpoints[Breakpoints.Small]) {
        // handle Small breakpoint
        this.displayedColumnsUsers = ['name', 'email', 'undo', 'delete'];
        this.displayedColumnsSection = ['sectionName', 'dtmDeleted', 'undo', 'delete'];
        this.displayedColumnsModule = ['moduleName', 'dtmDeleted', 'undo', 'delete'];
        this.displayedColumnsLesson = ['lessonName', 'dtmDeleted', 'undo', 'delete'];

      }
      if (result.breakpoints[Breakpoints.Medium]) {
        // handle Medium breakpoint
        this.displayedColumnsUsers = ['name', 'email', 'role', 'undo', 'delete'];
        this.displayedColumnsSection = ['sectionName', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];
        this.displayedColumnsModule = ['moduleName', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];
        this.displayedColumnsLesson = ['lessonName', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];

      }
      if (result.breakpoints[Breakpoints.Large]) {
        // handle Large breakpoint
        this.displayedColumnsUsers = ['name', 'email', 'role', 'last_login', 'undo', 'delete'];
        this.displayedColumnsSection = ['sectionName', 'dtmCreated', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];
        this.displayedColumnsModule = ['moduleName', 'dtmCreated', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];
        this.displayedColumnsLesson = ['lessonName', 'dtmCreated', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        // handle XLarge breakpoint
        this.displayedColumnsUsers = ['name', 'email', 'role', 'last_login', 'undo', 'delete'];
        this.displayedColumnsSection = ['sectionName', 'dtmCreated', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];
        this.displayedColumnsModule = ['moduleName', 'dtmCreated', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];
        this.displayedColumnsLesson = ['lessonName', 'dtmCreated', 'dtmUpdated', 'dtmDeleted', 'undo', 'delete'];

      }
    });

  }

  async getHistory() {
    await this.getDeletedHistory();
  }

  async getDeletedHistory() {
    await this.settingService.GetDeletedUsers();
    await this.settingService.GetDeletedSections();
    await this.settingService.GetDeletedModules();
    await this.settingService.GetDeletedLessons();

    this.userHistory = this.settingService.userList
    this.userHistoryBS = this.settingService.userListBS

    this.sectionHistory = this.settingService.sectionList
    this.sectionHistoryBS = this.settingService.sectionListBS

    this.modulesHistory = this.settingService.moduleList
    this.modulesHistoryBS = this.settingService.modulesListBS

    this.lessonHistory = this.settingService.lessonList
    this.lessonHistoryBS = this.settingService.lessonListBS
  }

  /*=============================== Undo ====================================*/
  async undoUserDelete(id: number) {
    let result = await this.settingService.undoUserDelete(id);
    if (result) {
      await this.updateAllListAndBSandNavLinks();
      this.snackBar.showSnackBarAlert("Successfully restored user", "success")
      return;
    }
    this.snackBar.showSnackBarAlert("Failed to restore user", "error")
  }

  async undoSectionDelete(id: number) {
    let result = await this.settingService.undoSectionDelete(id);
    if (result) {
      await this.updateAllListAndBSandNavLinks();
      this.snackBar.showSnackBarAlert("Successfully restored section", "success")
      return;
    }
    this.snackBar.showSnackBarAlert("Failed to restore section", "error")
  }

  async undoModuleDelete(id: number) {
    let result = await this.settingService.undoModuleDelete(id);
    if (result) {
      await this.updateAllListAndBSandNavLinks();
      this.snackBar.showSnackBarAlert("Successfully restored module", "success")
      return;
    }
    this.snackBar.showSnackBarAlert("Failed to restore module", "error")
  }

  async undoLessonDelete(id: number) {
    let result = await this.settingService.undoLessonDelete(id);
    if (result) {
      await this.updateAllListAndBSandNavLinks();
      this.snackBar.showSnackBarAlert("Successfully restored lesson", "success");


      return;
    }
    this.snackBar.showSnackBarAlert("Failed to restore lesson", "error")
  }


  /*=============================== Delete Forever ====================================*/
  async foreverDeleteUser(id: number) {
    let result = await this.settingService.foreverDeleteUser(id);
    if (result) {
      await this.updateAllListAndBSandNavLinks();
      this.snackBar.showSnackBarAlert("Successfully deleted user", "success")
      return;
    }
    this.snackBar.showSnackBarAlert("Failed to delete user", "error")
  }

  async foreverDeleteSection(id: number) {
    let result = await this.settingService.foreverDeleteSection(id);
    if (result) {
      await this.updateAllListAndBSandNavLinks();
      this.snackBar.showSnackBarAlert("Successfully deleted section", "success")
      return;
    }
    this.snackBar.showSnackBarAlert("Failed to delete section", "error")
  }

  async foreverDeleteModule(id: number) {
    let result = await this.settingService.foreverDeleteModule(id);
    if (result) {
      await this.updateAllListAndBSandNavLinks();
      this.snackBar.showSnackBarAlert("Successfully deleted module", "success")
      return;
    }
    this.snackBar.showSnackBarAlert("Failed to delete module", "error")
  }

  async foreverDeleteLesson(id: number) {
    let result = await this.settingService.foreverDeleteLesson(id);
    if (result) {
      await this.updateAllListAndBSandNavLinks();
      this.snackBar.showSnackBarAlert("Successfully deleted lesson", "success")
      return;
    }
    this.snackBar.showSnackBarAlert("Failed to delete lesson", "error")
  }


  async updateAllListAndBSandNavLinks(){
    this.userHistory = this.settingService.userList
    this.userHistoryBS = this.settingService.userListBS
    this.lessonHistory = this.settingService.lessonList;
    this.lessonHistoryBS = this.settingService.lessonListBS;
    this.modulesHistory = this.settingService.moduleList;
    this.modulesHistoryBS = this.settingService.modulesListBS;
    this.sectionHistory = this.settingService.sectionList;
    this.sectionHistoryBS = this.settingService.sectionListBS;
    await this.navService.populateNavLinks();
    await this.navService.getNavLinks();
  }


}
