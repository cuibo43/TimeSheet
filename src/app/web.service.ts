<<<<<<< HEAD
import { YearlyVacation } from './summary/YearlyVacation';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

=======
import { Injectable } from "@angular/core";
>>>>>>> origin/release

@Injectable({
  providedIn: "root"
})
export class WebService {
<<<<<<< HEAD

  constructor(private http: HttpClient) { }

  getvacationLeft() {
    return this.http.get<YearlyVacation>('api/summary/vacationLeft');
  }
=======
  constructor() {}
>>>>>>> origin/release
}
