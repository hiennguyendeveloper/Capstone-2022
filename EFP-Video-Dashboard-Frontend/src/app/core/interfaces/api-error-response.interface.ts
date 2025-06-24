import {ApiErrorResponseCode} from "../enum/api-error-response-code";


export interface ApiErrorResponseInterface {
  displayToUser: boolean;
  errorCode: string;
  readableErrorMessage: string;
  apiErrorResponse: ApiErrorResponseCode
}
