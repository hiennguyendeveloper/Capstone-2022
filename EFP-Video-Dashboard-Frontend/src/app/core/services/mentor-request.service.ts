import {Injectable} from '@angular/core';
import {MentorRequestInterface} from "../interfaces/MentorRequestInterface";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BasicResponseInterface} from "../interfaces/BasicResponseInterface";
import {SnackBarService} from "./snack-bar.service";

@Injectable({
  providedIn: 'root'
})
export class MentorRequestService {

  constructor(private httpClient:HttpClient,
              private snackBar: SnackBarService) {
  }

  async newMentorRequest(mentorRequest: MentorRequestInterface) {
    try {
      const obs = this.httpClient.post<BasicResponseInterface>(environment.baseApiUrl + "/mentor_request/create", mentorRequest)
      let temp: BasicResponseInterface = await lastValueFrom<BasicResponseInterface>(obs);
      if (temp != null) {
        return temp.response
      }
      return false
    }
      /* istanbul ignore next */
     catch (e) {
      this.snackBar.showSnackBarAlert("Unable to submit mentor request.", "error")
      return false;
    }
  }


}
