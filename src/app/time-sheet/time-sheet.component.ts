import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WebService } from "../web.service";
import { WeeklySummary } from "../model/weekly-summary";
import {ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: "app-time-sheet",
  templateUrl: "./time-sheet.component.html",
  styleUrls: ["./time-sheet.component.css"]
})
export class TimeSheetComponent implements OnInit {
  endingDay:string;
  totalBillingHours: number;
  totalCompensatedHours: number;
  endDate:{year: number, month: number, day:number};
  summarie$: Observable<WeeklySummary>;
  summarie: WeeklySummary;
  constructor(private api: WebService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.endingDay = params['endingDay'];
  });
    this.summarie$ = this.api.getWeeklySummarieByUseNameAndDate(this.endingDay).pipe(map(data => data));
    this.summarie$.subscribe(data => {
      this.summarie = data;
    });
  }
  changeDate(){
    this.endingDay=(this.endDate.year)+'-'+this.pad(this.endDate.month)+'-'+this.pad(this.endDate.day);
    this.router.navigate(['/timeSheet'], { queryParams: {endingDay: this.endingDay}});

  }
  calBilling(){
    let billing = 0;
    for(const day of this.summarie.days){
      billing=billing+day.totalHours;
    }
    return billing;
  }
  calCompensated(){
    let compensated = 0;
    for(const day of this.summarie.days){
      if(day.floatingDay){
        compensated=compensated+8;
      }
      compensated=compensated+day.totalHours;
    }
    return compensated;
  }
  pad(num) {
    let s = num+"";
    while (s.length < 2){
      s = "0" + s;
    }
    return s;
}

}
