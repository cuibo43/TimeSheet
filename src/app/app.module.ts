import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SummaryComponent } from "./summary/summary.component";
import { TimeSheetComponent } from "./time-sheet/time-sheet.component";
import { ProfileComponent } from "./profile/profile.component";

import { AuthenticationService } from "./authentication.service";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthGaurdService } from "./auth-gaurd.service";
import { WebService } from "./web.service";
import { LoginComponent } from "./login/login.component";
import { FileUploadModule } from "ng2-file-upload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PhoneNumberPipe } from './phone-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    TimeSheetComponent,
    ProfileComponent,
    LoginComponent,
    PageNotFoundComponent,
    PhoneNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    FileUploadModule
  ],

  providers: [WebService, AuthGaurdService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
