import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./login/login.component";
import { TimeSheetComponent } from "./time-sheet/time-sheet.component";
import { ProfileComponent } from "./profile/profile.component";
import { SummaryComponent } from "./summary/summary.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGaurdService } from "./auth-gaurd.service";

const routes: Routes = [
  {
    path: "summary",
    component: SummaryComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: "timeSheet",
    component: TimeSheetComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: "profile",
    component: ProfileComponent,
    // canActivate: [AuthGaurdService]
  },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
