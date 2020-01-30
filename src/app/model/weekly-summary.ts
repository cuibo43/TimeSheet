import { Day } from "./day";

export class WeeklySummary {
  username: string;
  endingDate: string;
  totalHours: number;
  submissionStatus: string;
  approvalStatus: string;
  comment: string;
  year: number;
  days: Day[];
}
