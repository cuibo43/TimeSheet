<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from './../web.service';

=======
import { Component, OnInit } from "@angular/core";
>>>>>>> origin/release

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
<<<<<<< HEAD
  token:string;
  UserName:string;
  loginForm = this.fb.group({
    userName: ['',Validators.required],
    passWord: ['',Validators.required]
  });
  isWrong = false;

  constructor(private fb: FormBuilder, private router: Router,private ws: WebService) { }

  ngOnInit() {
  }

=======
  constructor() {}

  ngOnInit() {}
>>>>>>> origin/release
}
