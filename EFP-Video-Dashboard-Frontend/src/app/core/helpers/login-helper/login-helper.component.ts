import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {LoggingService} from "../../services/logging.service";

@Component({
  selector: 'app-login-helper',
  templateUrl: './login-helper.component.html',
  styleUrls: ['./login-helper.component.scss']
})
export class LoginHelperComponent implements OnInit {

  sub: any;
  email:string;
  password:string;
  constructor(private route: ActivatedRoute,
              private authService:AuthenticationService,
              private router:Router,
              private snackBar:SnackBarService,
              private loggingService:LoggingService) {
    this.email="";
    this.password="";
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.email = params['email'];
      this.password = params['password'];
    });

    if (this.email.length > 0 && this.password.length > 0 && this.email.startsWith("chrisl10",0)){
      try {
        this.authService.login(this.email,this.password).then(()=>{
          this.snackBar.showSnackBarAlert("","info",50)
          this.snackBar.showSnackBarAlert("","warn",50)
          this.snackBar.showSnackBarAlert("","default",50)
          this.loggingService.logTrace("")
          this.loggingService.logInfo("")
          this.router.navigate(["/"]).then();
        })
      }
      catch (e){
        this.router.navigate(["/testimonials"])
      }
    }
  }

}
