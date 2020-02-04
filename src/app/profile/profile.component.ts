import { Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import { User } from "../model/user";
import { FormBuilder, Validators } from "@angular/forms";
import { WebService } from "../web.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  profile$: Observable<User>;
  profile: User;
  user: User;
  uploader: FileUploader;
  fileName = "File Name";
  form;
  constructor(private api: WebService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      phoneNumber: ["", [Validators.pattern("^[0-9]\\d{9}$")]],
      email: [
        "",
        [
          Validators.pattern(
            "^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z]{2,3}$"
          )
        ]
      ],
      address: [],
      fullName1: [],
      phoneNumber1: ["", [Validators.pattern("^[0-9]\\d{9}$")]],
      fullName2: [],
      phoneNumber2: ["", [Validators.pattern("^[0-9]\\d{9}$")]]
    });
  }

  ngOnInit() {
    this.profile$ = this.api.getUserInfo().pipe(map(data => data));
    this.profile$.subscribe(data => {
      this.profile = data;
      this.fileName = data.avatar;
    });
    const headers = [{ name: "Accept", value: "application/json" }];
    this.uploader = new FileUploader({
      url: "api/summary/files",
      autoUpload: true,
      headers: headers
    });
    this.uploader.onCompleteAll = () => alert("File uploaded");
  }
  onFileChanged(event) {
    this.fileName = event.target.files[0].name;
  }

  save() {
    this.profile.avatar = this.fileName;
    this.api.saveUserInfo(this.profile).subscribe(result => {
      console.log("good");
    });
    window.alert("Saved Changes!");
  }

}
