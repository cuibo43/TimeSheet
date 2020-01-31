import { LoginComponent } from "./login/login.component";
import { TimeSheetComponent } from "./time-sheet/time-sheet.component";
import { ProfileComponent } from "./profile/profile.component";
import { SummaryComponent } from "./summary/summary.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "summary", component: SummaryComponent },
  { path: "timeSheet", component: TimeSheetComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/summary", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
