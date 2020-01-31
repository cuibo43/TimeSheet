import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WeeklySummary } from "./model/weekly-summary";
import { YearlyVacation } from "./summary/YearlyVacation";
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: "root"
})
export class WebService {
  constructor(private http: HttpClient) {}

  getVacationLeft(summary) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=UTF-8',
      })};
    return this.http.post<YearlyVacation>("api/summary/vacationLeft",JSON.stringify(summary),httpOptions);
  }

  getWeeklySummaries() {
    return this.http.get<WeeklySummary[]>("api/summary/all");
  }
}
