import { Component, OnInit } from "@angular/core";
import { WebService } from "../web.service";
import { WeeklySummary } from "../model/weekly-summary";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"]
})
export class SummaryComponent implements OnInit {
  summaries$: Observable<WeeklySummary[]>;
  summaries: WeeklySummary[];

  constructor(private api: WebService) {}

  ngOnInit() {
    this.summaries$ = this.api.getWeeklySummaries().pipe(map(data => data));
    this.summaries$.subscribe(data => (this.summaries = data));
  }

  onEditPressed() {
    console.log("Edit pressed");
  }

  onViewPressed() {
    console.log("View pressed");
  }
}
