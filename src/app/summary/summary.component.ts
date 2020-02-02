import { Component, OnInit } from "@angular/core";
import { WebService } from "../web.service";
import { WeeklySummary } from "../model/weekly-summary";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { YearlyVacation } from "./YearlyVacation";
import { Router } from "@angular/router";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"]
})
export class SummaryComponent implements OnInit {
  summaries$: Observable<WeeklySummary[]>;
  summaries: WeeklySummary[];
  end = 5;
  currentYear = -1;

  vacationLeft$: Observable<YearlyVacation>;
  vacationLeft: YearlyVacation;

  constructor(private api: WebService, private router: Router) {}

  ngOnInit() {
    this.summaries$ = this.api.getWeeklySummaries().pipe(map(data => data));
    this.summaries$.subscribe(data => (this.summaries = data));
  }

  onShowMorePressed() {
    this.end += 5;
  }

  view(endingDate) {
    this.router.navigate(["/timeSheet"], {
      queryParams: { endingDay: endingDate }
    });
  }

  gCommentTag(summary: WeeklySummary) {
    if (summary.year !== this.currentYear) {
      this.vacationLeft$ = this.api
        .getVacationLeft(summary)
        .pipe(map(data => data));
      this.vacationLeft$.subscribe(data => (this.vacationLeft = data));
      this.currentYear = summary.year;
    }
    return this.vacationLeft;
  }

  gComment(summary: WeeklySummary) {
    let holiday = 0;
    let vacation = 0;
    let floatingDate = 0;
    for (const day of summary.days) {
      if (day.floatingDay === true) {
        floatingDate = floatingDate + 1;
      }
      if (day.holiday === true) {
        holiday = holiday + 1;
      }
      if (day.vacation === true) {
        vacation = vacation + 1;
      }
    }
    const nList: number[] = [floatingDate, vacation, holiday];
    return nList;
  }
}
