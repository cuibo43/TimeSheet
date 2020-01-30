import { LoginComponent } from "./login/login.component";
import { TimeSheetComponent } from "./time-sheet/time-sheet.component";
import { ProfileComponent } from "./profile/profile.component";
import { SummaryComponent } from "./summary/summary.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "summary", component: SummaryComponent },
  { path: "timeSheet", component: TimeSheetComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
