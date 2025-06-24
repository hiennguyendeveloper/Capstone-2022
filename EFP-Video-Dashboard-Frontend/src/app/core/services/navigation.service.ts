import {Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom} from "rxjs";
import {NavigationLinkInterface} from "../interfaces/NavigationLinkInterface";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "./logging.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public NavLinksBS: BehaviorSubject<NavigationLinkInterface[] | null>;
  private NavLinks: NavigationLinkInterface[] | null;

  constructor(private httpClient: HttpClient,
              private loggingService: LoggingService) {
    this.NavLinks = null;
    this.NavLinksBS = new BehaviorSubject<NavigationLinkInterface[] | null>(null);


  }

  async getNavLinks() {
    try {
      const obs = this.httpClient.get<NavigationLinkInterface[]>(environment.baseApiUrl + "/nav/getNavLinks")
      this.NavLinks = await lastValueFrom<NavigationLinkInterface[]>(obs);

      this.NavLinksBS.next(this.NavLinks);
    } catch (e) {
      this.loggingService.logError(e, "NavigationService failed to fetch nav links")

    }
  }

  async populateNavLinks() {
    const obs = this.httpClient.get(environment.baseApiUrl + "/nav/populate");
    await lastValueFrom(obs);
    await this.getNavLinks();
  }


}
