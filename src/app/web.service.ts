import { YearlyVacation } from "./summary/YearlyVacation";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class WebService {
  constructor(private http: HttpClient) {}

  getvacationLeft() {
    return this.http.get<YearlyVacation>("api/summary/vacationLeft");
  }
}
