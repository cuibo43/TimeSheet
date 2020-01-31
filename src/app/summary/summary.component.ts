import { Day } from './../model/day';
import { Component, OnInit } from "@angular/core";
import { WebService } from "../web.service";
import { WeeklySummary } from "../model/weekly-summary";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { YearlyVacation } from "./YearlyVacation";


@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"]
})
export class SummaryComponent implements OnInit {
  summaries$: Observable<WeeklySummary[]>;
  summaries: WeeklySummary[];
  end = 5;

  vacationLeft$: Observable<YearlyVacation>;
  vacationLeft: YearlyVacation;

  constructor(private api: WebService) {}

  ngOnInit() {
    this.summaries$ = this.api.getWeeklySummaries().pipe(map(data => data));
    this.summaries$.subscribe(data => (this.summaries = data));
  }

  onShowMorePressed() {
    this.end += 5;
  }

  gCommentTag(summary: WeeklySummary){
    this.vacationLeft$ = this.api.getVacationLeft(summary).pipe(map(data => data));
    this.vacationLeft$.subscribe(data => (this.vacationLeft = data));
    return this.vacationLeft;


  }

  gComment(summary: WeeklySummary){
    let holiday = 0;
    let vacation = 0;
    let floatingdate = 0;
    for(const day of summary.days){
      if(day.floatingDay === true){
        floatingdate = floatingdate + 1;
      }
      if(day.holiday===true){
        holiday=holiday+1;
      }
      if(day.vacation===true){
        vacation=vacation+1;
      }
    }
    const nList: number [] = [ floatingdate,vacation,holiday ]
    return nList;
}

}
