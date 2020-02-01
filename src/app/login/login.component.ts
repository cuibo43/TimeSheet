import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { WebService } from "./../web.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  token: string;
  UserName: string;
  loginForm = this.fb.group({
    userName: ["", Validators.required],
    passWord: ["", Validators.required]
  });
  isWrong = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ws: WebService,
    private loginservice: AuthenticationService
  ) {}

  ngOnInit() {}
  SignIn() {
    this.ws.authenticate(this.loginForm.get('userName').value, this.loginForm.get('passWord').value)
    .subscribe(responseData => {
      this.token=responseData['token'];
      this.UserName=responseData['username'];
      console.log(this.token);
      if(this.UserName !== null){
        this.loginservice.setToken(this.UserName,this.token);
        this.router.navigate(['summary']);}
    },        error => this.isWrong=true
    );
  }
}
