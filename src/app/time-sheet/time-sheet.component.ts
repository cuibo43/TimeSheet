import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WebService } from "../web.service";
import { WeeklySummary } from "../model/weekly-summary";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-time-sheet",
  templateUrl: "./time-sheet.component.html",
  styleUrls: ["./time-sheet.component.css"]
})
export class TimeSheetComponent implements OnInit {
  endingDay: string;
  totalBillingHours: number;
  totalCompensatedHours: number;
  endDate: string;
  summaries$: Observable<WeeklySummary>;
  summaries: WeeklySummary;
  constructor(
    private api: WebService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.endingDay = params.endingDay;
    });
    this.summaries$ = this.api
      .getWeeklySummariesByUseNameAndDate(this.endingDay)
      .pipe(map(data => data));
    this.summaries$.subscribe(data => (this.summaries = data));
  }
}
