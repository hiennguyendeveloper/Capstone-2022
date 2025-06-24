import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MentorRequestInterface} from "../../core/interfaces/MentorRequestInterface";
import {MentorRequestService} from "../../core/services/mentor-request.service";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {Router} from "@angular/router";

export interface Gender {
  name: string;
  value:number;
}




@Component({
  selector: 'app-mentor-request',
  templateUrl: './mentor-request.component.html',
  styleUrls: ['./mentor-request.component.scss']
})
export class MentorRequestComponent implements OnInit {
  mentorRequestFormGroup: FormGroup;
  genders: Gender[];


  constructor(private _formBuilder: FormBuilder,
              private mentorService: MentorRequestService,
              private snackBar: SnackBarService,
              private router:Router) {
    this.mentorRequestFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      gender_request: ['', Validators.required],
      mentor_description: ['', [Validators.required, Validators.maxLength(225)]]
    })

    this.genders = [
      {name: 'Male', value: 0},
      {name:'Female',value:1},
      {name:'Random',value:2},

    ];
  }


  ngOnInit(): void {
  }


  async submitFunc() {
    if (this.mentorRequestFormGroup.valid && this.mentorRequestFormGroup.get("name")?.value != null &&
      this.mentorRequestFormGroup.get("gender_request")?.value != null && this.mentorRequestFormGroup.get("mentor_description")?.value != null) {

      const mentorRequestInterface: MentorRequestInterface = {
        id: null,
        dtmCreated: null,
        dtmUpdated: null,
        dtmDeleted: null,
        status: null,
        name: this.mentorRequestFormGroup.get("name")!.value,
        gender: this.mentorRequestFormGroup.get("gender_request")!.value,
        description: this.mentorRequestFormGroup.get("mentor_description")!.value

      }

      let result = await this.mentorService.newMentorRequest(mentorRequestInterface).then();
      if (result) {
        this.snackBar.showSnackBarAlert("Mentor request successful.", "success")
        await this.router.navigate(["/"])
      } else {
        this.snackBar.showSnackBarAlert("Mentor request was not successful", "error")
      }


    }

  }


}
