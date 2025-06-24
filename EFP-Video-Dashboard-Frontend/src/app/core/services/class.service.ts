/* istanbul ignore file */
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModuleInterface} from "../interfaces/ModuleInterface";
import {BehaviorSubject, lastValueFrom} from "rxjs";
import {SnackBarService} from "./snack-bar.service";
import {LessonInterface} from "../interfaces/LessonInterface";
import {environment} from "../../../environments/environment";
import {VideoListInterface} from "../interfaces/VideoListInterface";
import {BasicResponseInterface} from "../interfaces/BasicResponseInterface";
import {SectionInterface} from "../interfaces/SectionInterface";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  public sectionListBS: BehaviorSubject<SectionInterface[] | null>;
  public moduleListBS: BehaviorSubject<ModuleInterface[] | null>;
  public lessonListBS: BehaviorSubject<LessonInterface[] | null>;
  public videoListBS: BehaviorSubject<VideoListInterface[] | null>;
  private sectionList: SectionInterface[] | null;
  private moduleList: ModuleInterface[] | null;
  private lessonList: LessonInterface[] | null;
  private videoList: VideoListInterface | null;

  constructor(private httpClient: HttpClient, private snackBar: SnackBarService) {
    this.sectionList = null;
    this.sectionListBS = new BehaviorSubject<SectionInterface[] | null>(null);

    this.moduleList = null;
    this.moduleListBS = new BehaviorSubject<ModuleInterface[] | null>(null)

    this.lessonList = null;
    this.lessonListBS = new BehaviorSubject<LessonInterface[] | null>(null)

    this.videoList = null;
    this.videoListBS = new BehaviorSubject<VideoListInterface[] | null>(null)
  }

  async getLessons(id: number | null) {
    if (id == null) {
      return null;
    }
    await this.populateLessons(id).then();
    return this.lessonListBS;
  }

  /* istanbul ignore next */

  async getSections(id: number | undefined) {
    if (id == undefined) {
      return null;
    }
    await this.populateSections(id).then();
    return this.sectionListBS;
  }

  async getModules(id: number | undefined) {
    if (id == undefined) {
      return null;
    }
    await this.populateModules(id).then();
    return this.moduleListBS;

  }

  /* istanbul ignore next */
  async getVideos(id: number | undefined) {
    if (id == undefined) {
      return null;
    }
    await this.populateVideos(id).then();
    return this.videoListBS;
  }

  /* istanbul ignore next */
  async populateVideos(id: number) {
    if (id == undefined) {
      return null;
    }
    try {
      const obs = this.httpClient.get<VideoListInterface>(environment.baseApiUrl + "/video/getVideoModel/" + id)
      return await lastValueFrom<VideoListInterface>(obs)
    } catch (e) {
      /*this.snackBar.showSnackBarAlert("Unable to retrieve videos for this section", "error", 4000)*/
      return null;
    }
  }

  /* istanbul ignore next */
  async populateSections(id: number) {
    try {
      const obs = this.httpClient.get<SectionInterface[]>(environment.baseApiUrl + "/section/list-section/" + id)
      this.sectionList = await lastValueFrom<SectionInterface[]>(obs)

      this.sectionListBS.next(this.sectionList);
    } catch (e) {
      this.snackBar.showSnackBarAlert("Unable to retrieve section list", "error", 4000)

    }
  }

  async populateModules(id: number) {
    try {
      const obs = this.httpClient.get<ModuleInterface[]>(environment.baseApiUrl + "/module/list-module/" + id)
      this.moduleList = await lastValueFrom<ModuleInterface[]>(obs)
      this.moduleListBS.next(null);
      this.moduleListBS.next(this.moduleList)
    } catch (e) {
      this.snackBar.showSnackBarAlert("Unable to retrieve module list for this section", "error", 4000)
    }

  }

  async populateLessons(id: number) {
    try {
      const obs = this.httpClient.get<LessonInterface[]>(environment.baseApiUrl + "/lesson/list-lesson/" + id)
      this.lessonList = await lastValueFrom<LessonInterface[]>(obs)
      this.lessonListBS.next(null)
      this.lessonListBS.next(this.lessonList)
    } catch (e) {
      this.snackBar.showSnackBarAlert("Unable to retrieve lesson list for this section", "error", 4000)
    }
  }

  async getSection(id: number | null){
    try {
      if (id == null) {
        this.snackBar.showSnackBarAlert("Class Service--No Id was passed", "error")
        return false
      }

      const obs = this.httpClient.get<SectionInterface>(environment.baseApiUrl + "/section/get-sections/" + id);
      const response = await lastValueFrom<SectionInterface>(obs);

      if (response == null) {
        this.snackBar.showSnackBarAlert("UserDetailService--No detail was returned", "error")
        return false;
      }

      return response;
    }catch{
      return false;
    }

  }
  async getModule(id: number | null) {
    try {
      if (id == null) {
        this.snackBar.showSnackBarAlert("Class Service--No Id was passed", "error")
        return false
      }

      const obs = this.httpClient.get<ModuleInterface>(environment.baseApiUrl + "/module/get_module_details/" + id);
      const response = await lastValueFrom<ModuleInterface>(obs);

      if (response == null) {
        this.snackBar.showSnackBarAlert("UserDetailService--No detail was returned", "error")
        return false;
      }

      return response;
    }catch{
      return false;
    }
  }

  async getLesson(id: number | null) {
    try {
      if (id == null) {
        this.snackBar.showSnackBarAlert("Class Service--No Id was passed", "error")
        return false
      }

      const obs = this.httpClient.get<LessonInterface>(environment.baseApiUrl + "/lesson/get_lesson_details/" + id);
      const pModuleDetails = await lastValueFrom<LessonInterface>(obs);

      if (pModuleDetails == null) {
        this.snackBar.showSnackBarAlert("UserDetailService--No detail was returned", "error")
        return false;
      }

      return pModuleDetails;
    }catch{
      return false;
    }
  }

  /* istanbul ignore next */
  async updateSection(newSection: SectionInterface) {
    if (newSection == null) {
      return false
    }
    try {
      const obs = this.httpClient.post<SectionInterface>(environment.baseApiUrl + "/section/update-section", newSection)
      return await lastValueFrom<SectionInterface>(obs);


    } catch (e) {
      return false;
    }
  }

  /* istanbul ignore next */
  async updateModule(newModule: ModuleInterface) {
    if (newModule == null) {
      return false
    }
    try {
      const obs = this.httpClient.post<ModuleInterface>(environment.baseApiUrl + "/module/update-module", newModule)
      return await lastValueFrom<ModuleInterface>(obs);


    } catch (e) {
      return false;
    }
  }

  /* istanbul ignore next */
  async updateLesson(newLesson: LessonInterface) {
    if (newLesson == null) {
      return false
    }
    try {
      const obs = this.httpClient.post<LessonInterface>(environment.baseApiUrl + "/lesson/update-lesson", newLesson)
      return await lastValueFrom<LessonInterface>(obs);


    } catch (e) {
      return false;
    }
  }

  async deleteSection(id: number) {
    if (id == null) {
      this.snackBar.showSnackBarAlert("Class Service--No Id was passed", "error")
      return false
    }

    const obs = this.httpClient.get<BasicResponseInterface>(environment.baseApiUrl + "/section/delete-section/" + id);
    const result = await lastValueFrom<BasicResponseInterface>(obs);

    if (result == null) {
      this.snackBar.showSnackBarAlert("UserDetailService--No detail was returned", "error")
      return false;
    }

    return result;
  }

  async deleteModule(id: number) {
    if (id == null) {
      this.snackBar.showSnackBarAlert("Class Service--No Id was passed", "error")
      return false
    }

    const obs = this.httpClient.get<BasicResponseInterface>(environment.baseApiUrl + "/module/delete-module/" + id);
    const result = await lastValueFrom<BasicResponseInterface>(obs);

    if (result == null) {
      this.snackBar.showSnackBarAlert("UserDetailService--No detail was returned", "error")
      return false;
    }

    return result;
  }

  async deleteLesson(id: number) {
    if (id == null) {
      this.snackBar.showSnackBarAlert("Class Service--No Id was passed", "error")
      return false
    }

    const obs = this.httpClient.get<BasicResponseInterface>(environment.baseApiUrl + "/lesson/delete-lesson/" + id);
    const result = await lastValueFrom<BasicResponseInterface>(obs);

    if (result == null) {
      this.snackBar.showSnackBarAlert("UserDetailService--No detail was returned", "error")
      return false;
    }

    return result;
  }

  async putSection(sectionInterface: SectionInterface) {
    try {
      const obs = this.httpClient.post<SectionInterface>(environment.baseApiUrl + "/section/create-section", sectionInterface)
      let temp = await lastValueFrom<SectionInterface>(obs);
      if (temp != null) {
        return temp;
      }
      return null;
    } catch (e) {
      this.snackBar.showSnackBarAlert("Unable to Create a new lesson", "error")
      return null;
    }
  }

  async putModule(newModule: ModuleInterface) {
    try {
      const obs = this.httpClient.post<ModuleInterface[]>(environment.baseApiUrl + "/module/create-module", newModule)
      let temp = await lastValueFrom<ModuleInterface[]>(obs);
      if (temp != null) {
        this.moduleListBS.next(temp)
        return this.moduleListBS;
      }
      return false;

    } catch (e) {
      this.snackBar.showSnackBarAlert("Unable to Create a new module.", "error")
      return false;
    }
  }

  async putLesson(newLesson: LessonInterface) {
    try {
      const obs = this.httpClient.post<LessonInterface[]>(environment.baseApiUrl + "/lesson/create-lesson", newLesson)
      let temp = await lastValueFrom<LessonInterface[]>(obs);
      if (temp != null && this.lessonList != null) {
        this.lessonListBS.next(temp)
        return this.lessonListBS;
      }
      return false

    } catch (e) {
      this.snackBar.showSnackBarAlert("Unable to Create a new lesson.", "error")
      return false;
    }
  }


}
