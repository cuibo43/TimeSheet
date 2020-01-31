import { Day } from "./day";

export class WeeklySummary {
  id: string;
  username: string;
  endingDate: string;
  totalHours: number;
  submissionStatus: string;
  approvalStatus: string;
  comment: string;
  year: number;
  days: Day[];
}
