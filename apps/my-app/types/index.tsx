export interface Branch {
  id: string;
  name: string;
  code: string;
  location: string;
  phone: string;
  manager: string;
  active: boolean;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  duration: string;
  branchId: string;
  branch: Branch;
  lecturerId: string | null;
  isActive: boolean;
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: Date;
  phone: string;
  email: string;
  address: string;
  branchId: string;
  branch: Branch;
  courseId: string;
  course: Course;
  enrollmentDate: Date;
  status: "ACTIVE" | "INACTIVE" | "GRADUATED" | "SUSPENDED";
  photo: string | null;
}

export interface Staff {
  id: string;
  staffId: string;
  fullName: string;
  email: string;
  phone: string;
  role: "SUPER_ADMIN" | "BRANCH_ADMIN" | "LECTURER" | "ACCOUNTANT";
  department: string;
  branchId: string;
  branch: Branch;
  userId: string | null;
  isActive: boolean;
  hireDate: Date;
}

export interface Payment {
  id: string;
  receiptNo: string;
  studentId: string;
  student: Student;
  branchId: string;
  branch: Branch;
  amount: number;
  paymentDate: Date;
  paymentMethod: "CASH" | "BANK_TRANSFER" | "MPESA" | "CHEQUE";
  description: string;
  createdBy: string;
}

export interface Application {
  id: string;
  applicationNo: string;
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  course: Course;
  branchId?: string;
  branch?: Branch;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CONVERTED";
  appliedDate: Date;
  reviewedBy?: string;
  reviewedDate?: Date;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "SUPER_ADMIN" | "BRANCH_ADMIN" | "LECTURER" | "ACCOUNTANT";
  branchId: string | null;
  branch: Branch | null;
  isActive: boolean;
}

export interface Attendance {
  id: string;
  studentId?: string;
  staffId?: string;
  branchId: string;
  date: Date;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
  checkInTime?: Date;
  checkOutTime?: Date;
}

export interface Timetable {
  id: string;
  branchId: string;
  courseId: string;
  lecturerId: string;
  dayOfWeek:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  startTime: string;
  endTime: string;
  room: string;
  academicYear: string;
  semester: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "PAYMENT" | "ATTENDANCE";
  userId?: string;
  branchId?: string;
  isRead: boolean;
  createdAt: Date;
}
