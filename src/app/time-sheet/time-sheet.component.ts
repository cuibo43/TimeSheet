import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { last, map } from "rxjs/operators";
import { WebService } from "../web.service";
import { WeeklySummary } from "../model/weekly-summary";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { formatDate, formatNumber } from "@angular/common";

@Component({
  selector: "app-time-sheet",
  templateUrl: "./time-sheet.component.html",
  styleUrls: ["./time-sheet.component.css"]
})
export class TimeSheetComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  endingDay: string;
  endDate: { year: number; month: number; day: number };
  summaries$: Observable<WeeklySummary>;
  summaries: WeeklySummary;
  preSummaries$: Observable<WeeklySummary>;
  timeHardCode: string[] = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM"
  ];
  hourOptions = [...Array(24).keys()];
  uploader: FileUploader;
  fileName = "File Name";
  isApproved: string;

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
    this.summaries$.subscribe(data => {
      this.summaries = data;
      console.log(this.summaries.days);
    });
    const headers = [{ name: "Accept", value: "application/json" }];
    this.uploader = new FileUploader({
      url: "api/summary/files",
      autoUpload: true,
      headers
    });
    this.uploader.onCompleteAll = () => alert("File uploaded");
  }

  floatingCheck(day) {
    const tempDay = this.summaries.days.find(x => x.date === day);
    tempDay.endingTime = null;
    tempDay.startingTime = null;
    tempDay.totalHours = 0;
    if (tempDay.holiday === true) {
      tempDay.holiday = false;
    }
    if (tempDay.vacation === true) {
      tempDay.vacation = false;
    }
  }

  vacationCheck(day) {
    const tempDay = this.summaries.days.find(x => x.date === day);
    tempDay.endingTime = null;
    tempDay.startingTime = null;
    tempDay.totalHours = 0;
    if (tempDay.holiday === true) {
      tempDay.holiday = false;
    }
    if (tempDay.floatingDay === true) {
      tempDay.floatingDay = false;
    }
  }

  holidayCheck(day) {
    const tempDay = this.summaries.days.find(x => x.date === day);
    tempDay.endingTime = null;
    tempDay.startingTime = null;
    tempDay.totalHours = 0;
    if (tempDay.vacation === true) {
      tempDay.vacation = false;
    }
    if (tempDay.floatingDay === true) {
      tempDay.floatingDay = false;
    }
  }

  onFileChanged(event) {
    this.fileName = event.target.files[0].name;
  }

  changeDate() {
    this.endingDay =
      this.endDate.year +
      "-" +
      this.pad(this.endDate.month) +
      "-" +
      this.pad(this.endDate.day);
    this.router.navigate(["/timeSheet"], {
      queryParams: { endingDay: this.endingDay }
    });
  }

  timeFit(startingTime, hour) {
    if (this.timeTransfer(hour) === startingTime) {
      return true;
    } else {
      return false;
    }
  }

  timeTransferWithNull(time: string) {
    if (time === "N/A") {
      return null;
    } else {
      return this.timeTransfer(time);
    }
  }

  timeTransfer(time: string) {
    const postfix = time.slice(-2);
    if (
      postfix === "AM" ||
      (postfix === "PM" && time.substring(0, 2) === "12")
    ) {
      return time.substring(0, 2) + ":00:00";
    } else {
      return +time.substring(0, 2) + 12 + ":00:00";
    }
  }

  save() {
    if (this.isApproved === "true" && this.fileName !== "File Name") {
      this.summaries.comment = this.fileName;
      this.summaries.approvalStatus = "Approved";
    }
    this.summaries.totalHours = this.calBilling();
    window.alert("Saved Changes!");

    // this.api.saveWeeklySummary(this.summaries).subscribe(result => {
    //   console.log("good");
    // });
  }

  calBilling() {
    let billing = 0;
    for (const day of this.summaries.days) {
      billing = billing + day.totalHours;
    }
    return billing;
  }

  calCompensated() {
    let compensated = 0;
    for (const day of this.summaries.days) {
      if (day.floatingDay) {
        compensated = compensated + 8;
      }
      compensated = compensated + day.totalHours;
    }
    return compensated;
  }

  pad(num) {
    let s = num + "";
    while (s.length < 2) {
      s = "0" + s;
    }
    return s;
  }

  onSetDefaultPressed() {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDay() - 7
    );

    this.preSummaries$ = this.api
      .getWeeklySummariesByUseNameAndDate(
        formatDate(lastWeek, "yyyy-MM-dd", "en-US")
      )
      .pipe(map(data => data));

    // overriding the current summary
    this.preSummaries$.subscribe(data => {
      this.summaries.days.forEach((day, index) => {
        day.startingTime = data.days[index].startingTime;
        day.endingTime = data.days[index].endingTime;
        day.totalHours = data.days[index].totalHours;
        day.floatingDay = false;
        day.vacation = false;
        day.holiday = false;
      });
    });
  }
}
