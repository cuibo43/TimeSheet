import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SummaryComponent } from "./summary/summary.component";
import { TimeSheetComponent } from "./time-sheet/time-sheet.component";
import { ProfileComponent } from "./profile/profile.component";

import { WebService } from "./web.service";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    TimeSheetComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule {}
