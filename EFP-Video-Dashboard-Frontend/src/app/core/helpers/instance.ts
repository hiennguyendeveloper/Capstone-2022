import {ApiErrorResponseInterface} from "../interfaces/api-error-response.interface";
import {ModuleInterface} from "../interfaces/ModuleInterface";
import {LessonInterface} from "../interfaces/LessonInterface";

export abstract class Instance {

  public static isInstanceOfModuleInterface(object: any): object is ModuleInterface {
    try {
      return "id" in object
        && "moduleName" in object
        && "moduleDescription" in object
        && "dtmCreated" in object
        && "dtmUpdated" in object
        && "dtmDeleted" in object
        && "section" in object
        && "picture" in object;
    } catch (e) {
      return false;
    }
  }

  public static isInstanceOfLessonInterface(object: any): object is LessonInterface {
    try {
      return "id" in object
        && "lessonName" in object
        && "dtmCreated" in object
        && "dtmUpdated" in object

        && "module" in object
        && "video" in object
        && "workbook" in object
        && "picture" in object;
    } catch (e) {
      return false;
    }
  }

  public static isInstanceOfApiErrorResponseInterface(object: any): object is ApiErrorResponseInterface {
    try {
      return "displayToUser" in object
        && "errorCode" in object
        && "readableErrorMessage" in object
        && "apiErrorResponse" in object;
    } catch (e) {
      return false;
    }
  }
  /* istanbul ignore next */
  public static isInstanceOfBoolean(object: any): object is boolean {
    try {
      return object
    } catch (e) {
      return false;
    }
  }

}
