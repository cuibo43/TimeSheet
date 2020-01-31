import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SummaryComponent } from "./summary/summary.component";
import { TimeSheetComponent } from "./time-sheet/time-sheet.component";
import { ProfileComponent } from "./profile/profile.component";
<<<<<<< HEAD
import { HttpClientModule } from "@angular/common/http";
=======
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


>>>>>>> James

import { WebService } from "./web.service";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    TimeSheetComponent,
    ProfileComponent,
    LoginComponent
<<<<<<< HEAD
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
=======
    ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,HttpClientModule,NgbModule],
>>>>>>> James
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule {}
