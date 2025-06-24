import {Injectable} from "@angular/core";
import {LoggingLevel} from "../enum/logging-levels";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})

export class LoggingService {

  private logLevel: LoggingLevel = LoggingLevel.debug;

  constructor() {
  }

  logTrace(msg: any) {
    this.writeToLog(LoggingLevel.trace, msg, null);
  }

  logInfo(msg: any) {
    this.writeToLog(LoggingLevel.info, msg, null);
  }

  /*  logDebug(msg: any) {
      this.writeToLog(LoggingLevel.debug, msg, null);
    }

    logWarn(msg: any) {
      this.writeToLog(LoggingLevel.warn, msg, null);
    }*/

  logError(error: any | null, msg: any) {
    this.writeToLog(LoggingLevel.error, msg, error);
  }

  /*  logFatal(error: any | null, msg: any) {
      this.writeToLog(LoggingLevel.fatal, msg, error);
    }*/


  private writeToLog(level: LoggingLevel, msg: any, error: any | null) {

    if (!this.shouldLog(level))
      return;

    /* istanbul ignore if */
    if (error !== null)
      console.log(`Time: ${new Date()} | Level: ${level} | Message: ${JSON.stringify(msg)} | Error: ${JSON.stringify(error)}`);
    else
      /* istanbul ignore next */
      console.log(`Time: ${new Date()} | Level: ${level} | Message: ${JSON.stringify(msg)}`);
  }

  private shouldLog(level: LoggingLevel): boolean {

    if (environment.production)
      return false;

    /* istanbul ignore next */
    return (level >= this.logLevel);
  }
}
