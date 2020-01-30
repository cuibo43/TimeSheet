import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WeeklySummary } from "./model/weekly-summary";
import { YearlyVacation } from "./summary/YearlyVacation";

@Injectable({
  providedIn: "root"
})
export class WebService {
  constructor(private http: HttpClient) {}

  getVacationLeft() {
    return this.http.get<YearlyVacation>("api/summary/vacationLeft");
  }

  getWeeklySummaries() {
    return this.http.get<WeeklySummary[]>("api/summary/all");
  }
}
