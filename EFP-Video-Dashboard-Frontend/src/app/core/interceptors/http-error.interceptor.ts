import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, retry,} from 'rxjs';
import {SnackBarService} from "../services/snack-bar.service";
import {ApiErrorResponseInterface} from "../interfaces/api-error-response.interface";
import {ApiErrorResponseCode} from "../enum/api-error-response-code";
import {LoggingService} from "../services/logging.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private loggingService: LoggingService,
              private snackbarService: SnackBarService,
              private authService: AuthenticationService,
              private router: Router,
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(retry(1),
        catchError((error: HttpErrorResponse) => {

          if (error.status == 200) {
            /* istanbul ignore next */
            return next.handle(request)
          }

          let apiErrorResponse = <ApiErrorResponseInterface>error
            .error;

          /* istanbul ignore if */
          if (apiErrorResponse == null) {

            this.loggingService
              .logError(error, "HttpErrorInterceptor encountered an error on a http request");

            this.authService.logout();

            apiErrorResponse = {
              displayToUser: false,
              errorCode: "No error message to translate see http-error for error handling",
              readableErrorMessage: error.message,
              apiErrorResponse: ApiErrorResponseCode.GenericErrorCodesGenericHttpErrorResponse
            };

            throw apiErrorResponse;
          }
          //If API standard error process accordingly
          if (apiErrorResponse.errorCode !== undefined
            && apiErrorResponse.errorCode !== null) {

            this.loggingService
              .logError(error, apiErrorResponse);

            const message = apiErrorResponse
              .readableErrorMessage;

            if (apiErrorResponse.displayToUser)
              this.snackbarService
                .showSnackBarAlert(message, "error", 10000);

            //Switch if you want to do custom logic on specific error code
            /* istanbul ignore next */
            switch (apiErrorResponse.apiErrorResponse) {
              case ApiErrorResponseCode.TokenExpired:
                this.authService.logout();
                break;
              case ApiErrorResponseCode.MissingServletRequestParameterException:
                this.router.navigate(['/']).then();
                break;
              case ApiErrorResponseCode.NoSuchElementException:
                this.router.navigate(['/testimonials']).then();
                break;
              case ApiErrorResponseCode.EmailConfirmationRequired:
                this.router.navigate(['/testimonials']).then();
                break;
              case ApiErrorResponseCode.SectionDelete:
                break
              case ApiErrorResponseCode.ModuleDelete:
                break;
              case ApiErrorResponseCode.LessonDelete:
                break;

            }

            throw apiErrorResponse;

          } else {

            //If not a standard api error just log
            this.loggingService
              .logError(error, "HttpErrorInterceptor encountered an error on a http request");

            this.authService.logout();

            apiErrorResponse = {
              displayToUser: false,
              errorCode: "No error message to translate see http-error for error handling",
              readableErrorMessage: error.message,
              apiErrorResponse: ApiErrorResponseCode.GenericErrorCodesGenericHttpErrorResponse
            };

            throw apiErrorResponse;
          }
        })
      );
  }
}
