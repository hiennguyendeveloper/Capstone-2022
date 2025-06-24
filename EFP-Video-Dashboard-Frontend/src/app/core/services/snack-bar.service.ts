import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarAlertComponent} from "../../shared/components/snack-bar-alert/snack-bar-alert.component";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public showSnackBarAlert(message: string, type: string, duration?: number) {

    const snackType = type !== undefined ? type : "success";

    let panelClass: string;

    switch (type) {
      case "success":
        panelClass = "mat-snackbar-success";
        break;
      case "error":
        panelClass = "mat-snackbar-error";
        break;
      case "warn":
        panelClass = "mat-snackbar-soft-warn";
        break;
      case "info":
        panelClass = "mat-snackbar-info";
        break;
      default:
        panelClass = "mat-snackbar-default";
    }

    this
      .snackBar
      .openFromComponent(SnackBarAlertComponent
        , {
          duration: duration || 4000,
          data: {message: message, snackType: snackType, snackBar: this.snackBar},
          panelClass: [`${panelClass}`]
        });
  }
}
