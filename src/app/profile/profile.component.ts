import { Component, OnInit } from "@angular/core";
import { User } from "../model/user";
import { FormBuilder, Validators } from "@angular/forms";
import { WebService } from "../web.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {FileUploader} from 'ng2-file-upload';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  profile$: Observable<User>;
  profile: User;
  user: User;
  uploader: FileUploader;
  // isDropOver: boolean;
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
    this.profile$.subscribe(data => (this.profile = data));
    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: 'api/summary/pic', autoUpload: true, headers: headers});
    this.uploader.onCompleteAll = () => alert('File uploaded');
  }
  onFileChanged(event) {
    this.fileName= event.target.files[0].name;
    }

  onSubmit() {
    const usr = new User();
    usr.phoneNumber = this.form.get("phoneNumber").value;
    usr.email = this.form.get("email").value;
    usr.address = "address";
    usr.contact1FirstName = this.form.get("fullName1").value;
    usr.contact1PhoneNumber = this.form.get("phoneNumber1").value;
    usr.contact2FirstName = this.form.get("fullName2").value;
    usr.contact2PhoneNumber = this.form.get("phoneNumber2").value;

    // this.potentialCandidateService
    //   .getPositionIdByName(this.form.get("position").value)
    //   .subscribe(data => {
    //     usr.positionId = data;
    //     this.potentialCandidateService
    //       .getEmailTemplateIdByName(this.form.get("emailTemplate").value)
    //       .subscribe(data => {
    //         usr.emailTemplateId = data;
    //         this.potentialCandidateService
    //           .addNewPotentialCandidate(pc)
    //           .subscribe(data => {
    //             console.log(data);
    //             if (data.responseMessage.statusCode === 200) {
    //               //TODO: Make the modal view disappear
    //             }
    //           });
    //       });
    //   });
  }
}
