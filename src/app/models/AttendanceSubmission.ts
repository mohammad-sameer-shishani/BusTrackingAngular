import { CreateAttendance } from "./CreateAttendance";

export interface AttendanceSubmission {
    teacherid: number;
    attendances: CreateAttendance[];
  }