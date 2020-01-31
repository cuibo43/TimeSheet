import { Component } from "@angular/core";
import { Router } from '@angular/router';



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(  private router: Router ) {
  }
  gotoTimeSheet(){
    const utc = new Date().toJSON().slice(0,10);
    this.router.navigate(['/timeSheet'], { queryParams: {endingDay: utc}});
  }
  gotoSummary(){
    this.router.navigate(['/summary']);
  }
  gotoProfile(){
    this.router.navigate(['/profile']);
  }
  gotoLog(){
    this.router.navigate(['/login']);
  }

}
