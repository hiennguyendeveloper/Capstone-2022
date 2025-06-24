import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-bar-alert',
  templateUrl: './snack-bar-alert.component.html',
  styleUrls: ['./snack-bar-alert.component.scss']
})
export class SnackBarAlertComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  public getIcon() {
    switch (this.data.snackType) {
      case "success":
        return {type: this.data.snackType, icon: "check"};
      case "error":
        return {type: this.data.snackType, icon: "error_outline"};
      case "warn":
        return {type: this.data.snackType, icon: "warning_amber"};
      case "info":
        return {type: this.data.snackType, icon: "info_outline"};
      default:
        return {type: this.data.snackType, icon: ""};
    }
  }

  public closeSnackbar() {
    this
      .data
      .snackBar
      .dismiss();
  }

}
