import {
  Branch,
  Course,
  Student,
  Staff,
  Payment,
  Application,
  User,
  // } from "@/types";
} from "../types/index";

// Branches
export const branches: Branch[] = [
  {
    id: "1",
    name: "FIBS Eldoret Campus",
    code: "ELD",
    location: "Eldoret Town, Opposite Zion Mall",
    phone: "+254712345678",
    manager: "John Kipchoge",
    active: true,
  },
  {
    id: "2",
    name: "FIBS Nairobi Campus",
    code: "NBO",
    location: "Westlands, Muthithi Road",
    phone: "+254723456789",
    manager: "Mary Wanjiku",
    active: true,
  },
  {
    id: "3",
    name: "FIBS Kisumu Campus",
    code: "KSM",
    location: "Milimani, Off Oginga Odinga Road",
    phone: "+254734567890",
    manager: "Peter Omondi",
    active: true,
  },
];

// Courses
export const courses: Course[] = [
  {
    id: "1",
    name: "ICT",
    code: "ICT101",
    description:
      "Information Communication Technology - Web Development, Networking, Database",
    duration: "6 months",
    branchId: "1",
    branch: branches[0],
    lecturerId: null,
    isActive: true,
  },
  {
    id: "2",
    name: "Driving",
    code: "DRV101",
    description: "Professional Driving Course - Manual and Automatic",
    duration: "3 months",
    branchId: "1",
    branch: branches[0],
    lecturerId: null,
    isActive: true,
  },
  {
    id: "3",
    name: "Electrical Engineering",
    code: "ELE101",
    description: "Electrical Installation and Maintenance",
    duration: "6 months",
    branchId: "1",
    branch: branches[0],
    lecturerId: null,
    isActive: true,
  },
  {
    id: "4",
    name: "Plumbing",
    code: "PLB101",
    description: "Plumbing and Pipe Installation",
    duration: "4 months",
    branchId: "2",
    branch: branches[1],
    lecturerId: null,
    isActive: true,
  },
  {
    id: "5",
    name: "Business Management",
    code: "BUS101",
    description: "Business Administration and Management",
    duration: "6 months",
    branchId: "2",
    branch: branches[1],
    lecturerId: null,
    isActive: true,
  },
  {
    id: "6",
    name: "Computer Packages",
    code: "CMP101",
    description: "Basic Computer Skills, MS Office, Internet",
    duration: "2 months",
    branchId: "3",
    branch: branches[2],
    lecturerId: null,
    isActive: true,
  },
];

// Generate 50 Students
const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "David",
  "Elizabeth",
  "William",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Charles",
  "Karen",
];
const lastNames = [
  "Mwangi",
  "Otieno",
  "Kiprop",
  "Wanjiku",
  "Omondi",
  "Korir",
  "Chebet",
  "Okoth",
  "Kamau",
  "Achieng",
  "Ndegwa",
  "Akinyi",
  "Mutua",
  "Atieno",
  "Kimani",
  "Ochieng",
  "Wambui",
  "Ouma",
  "Njeri",
  "Odhiambo",
];

export const generateStudents = (): Student[] => {
  const students: Student[] = [];

  for (let i = 1; i <= 50; i++) {
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const branchCourses = courses.filter((c) => c.branchId === branch.id);
    const course =
      branchCourses[Math.floor(Math.random() * branchCourses.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const gender = Math.random() > 0.5 ? "MALE" : "FEMALE";

    students.push({
      id: `student_${i}`,
      studentId: `STU${String(i).padStart(4, "0")}`,
      fullName,
      gender: gender as "MALE" | "FEMALE" | "OTHER",
      dateOfBirth: new Date(
        1995 + Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ),
      phone: `+2547${Math.floor(Math.random() * 90000000) + 10000000}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      address: `${branch.location}`,
      branchId: branch.id,
      branch,
      courseId: course.id,
      course,
      enrollmentDate: new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ),
      status: Math.random() > 0.2 ? "ACTIVE" : "INACTIVE",
      photo: null,
    });
  }

  return students;
};

// Generate Staff
const staffNames = [
  { name: "Dr. James Kamau", role: "LECTURER", department: "ICT" },
  { name: "Prof. Mary Wanjiku", role: "LECTURER", department: "Business" },
  { name: "Eng. John Otieno", role: "LECTURER", department: "Engineering" },
  { name: "Mr. Peter Omondi", role: "LECTURER", department: "Driving" },
  { name: "Ms. Sarah Kiprop", role: "LECTURER", department: "ICT" },
  { name: "Dr. Richard Mwangi", role: "LECTURER", department: "Business" },
  { name: "Mrs. Elizabeth Chebet", role: "ACCOUNTANT", department: "Finance" },
  { name: "Mr. William Okoth", role: "ACCOUNTANT", department: "Finance" },
  {
    name: "Ms. Patricia Achieng",
    role: "BRANCH_ADMIN",
    department: "Administration",
  },
  {
    name: "Mr. Joseph Ndegwa",
    role: "BRANCH_ADMIN",
    department: "Administration",
  },
  { name: "Mrs. Susan Atieno", role: "LECTURER", department: "Plumbing" },
  { name: "Mr. Charles Ochieng", role: "LECTURER", department: "Electrical" },
  {
    name: "Ms. Linda Akinyi",
    role: "LECTURER",
    department: "Computer Packages",
  },
  { name: "Dr. Robert Kimani", role: "LECTURER", department: "Management" },
  { name: "Mrs. Barbara Wambui", role: "ACCOUNTANT", department: "Finance" },
];

export const generateStaff = (): Staff[] => {
  const staff: Staff[] = [];

  staffNames.forEach((s, i) => {
    const branch = branches[Math.floor(Math.random() * branches.length)];
    staff.push({
      id: `staff_${i + 1}`,
      staffId: `STF${String(i + 1).padStart(3, "0")}`,
      fullName: s.name,
      email:
        s.name.toLowerCase().replace(/\./g, "").replace(/ /g, ".") +
        "@fibscollege.com",
      phone: `+2547${Math.floor(Math.random() * 90000000) + 10000000}`,
      role: s.role as
        | "SUPER_ADMIN"
        | "BRANCH_ADMIN"
        | "LECTURER"
        | "ACCOUNTANT",
      department: s.department,
      branchId: branch.id,
      branch,
      userId: null,
      isActive: true,
      hireDate: new Date(
        2022,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ),
    });
  });

  return staff;
};

// Generate Payments
export const generatePayments = (students: Student[]): Payment[] => {
  const payments: Payment[] = [];
  const methods = ["CASH", "BANK_TRANSFER", "MPESA", "CHEQUE"];

  for (let i = 1; i <= 200; i++) {
    const student = students[Math.floor(Math.random() * students.length)];
    const amount = [5000, 10000, 15000, 20000, 25000, 30000][
      Math.floor(Math.random() * 6)
    ];
    const date = new Date(
      2024,
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 28) + 1,
    );

    payments.push({
      id: `payment_${i}`,
      receiptNo: `RCPT${String(i).padStart(6, "0")}`,
      studentId: student.id,
      student,
      branchId: student.branchId,
      branch: student.branch,
      amount,
      paymentDate: date,
      paymentMethod: methods[Math.floor(Math.random() * methods.length)] as
        | "CASH"
        | "BANK_TRANSFER"
        | "MPESA"
        | "CHEQUE",
      description: `Fee payment for ${student.course.name}`,
      createdBy: "System",
    });
  }

  return payments.sort(
    (a, b) => b.paymentDate.getTime() - a.paymentDate.getTime(),
  );
};

// Generate Applications
const applicantNames = [
  "Alice Wanjiru",
  "Brian Omondi",
  "Catherine Muthoni",
  "Daniel Kiprop",
  "Esther Akinyi",
  "Francis Otieno",
  "Grace Wambui",
  "Henry Ndegwa",
  "Irene Atieno",
  "James Kamau",
  "Katherine Njeri",
  "Leonard Ochieng",
  "Monica Chebet",
  "Nicholas Okoth",
  "Olivia Achieng",
  "Patrick Odhiambo",
  "Queen Wanjiku",
  "Raymond Kipruto",
  "Stella Muthoni",
  "Timothy Ouma",
];

export const generateApplications = (): Application[] => {
  const applications: Application[] = [];
  const statuses = ["PENDING", "ACCEPTED", "REJECTED", "CONVERTED"];

  for (let i = 1; i <= 20; i++) {
    const name =
      applicantNames[Math.floor(Math.random() * applicantNames.length)];
    const [firstName, lastName] = name.split(" ");
    const course = courses[Math.floor(Math.random() * courses.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const appliedDate = new Date(
      2024,
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 28) + 1,
    );

    applications.push({
      id: `app_${i}`,
      applicationNo: `APP${String(i).padStart(4, "0")}`,
      fullName: name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      phone: `+2547${Math.floor(Math.random() * 90000000) + 10000000}`,
      courseId: course.id,
      course,
      branchId: status === "ACCEPTED" ? course.branchId : undefined,
      branch: status === "ACCEPTED" ? course.branch : undefined,
      status: status as "PENDING" | "ACCEPTED" | "REJECTED" | "CONVERTED",
      appliedDate,
      reviewedBy: status !== "PENDING" ? "Admin" : undefined,
      reviewedDate:
        status !== "PENDING"
          ? new Date(appliedDate.getTime() + 7 * 24 * 60 * 60 * 1000)
          : undefined,
      notes:
        status === "REJECTED"
          ? "Does not meet minimum requirements"
          : undefined,
    });
  }

  return applications;
};

// Users for authentication
export const users: User[] = [
  {
    id: "1",
    email: "superadmin@fibscollege.com",
    // password: "$2a$10$rVzSxXqXqXqXqXqXqXqXqO",
    password: "$2a$10$CwTycUXWue0Thq9StjUM0uJ8xU.svhZ2PjPbWExz2nP/7X0RWJ8/G",
    name: "Super Admin",
    role: "SUPER_ADMIN",
    branchId: null,
    branch: null,
    isActive: true,
  },
  {
    id: "2",
    email: "eldoretadmin@fibscollege.com",
    password: "$2a$10$rVzSxXqXqXqXqXqXqXqXqO",
    name: "Eldoret Admin",
    role: "BRANCH_ADMIN",
    branchId: "1",
    branch: branches[0],
    isActive: true,
  },
  {
    id: "3",
    email: "lecturer@fibscollege.com",
    password: "$2a$10$rVzSxXqXqXqXqXqXqXqXqO",
    name: "Lecturer",
    role: "LECTURER",
    branchId: "1",
    branch: branches[0],
    isActive: true,
  },
  {
    id: "4",
    email: "accounts@fibscollege.com",
    password: "$2a$10$rVzSxXqXqXqXqXqXqXqXqO",
    name: "Accountant",
    role: "ACCOUNTANT",
    branchId: "1",
    branch: branches[0],
    isActive: true,
  },
];

// Export all mock data
export const students = generateStudents();
export const staff = generateStaff();
export const payments = generatePayments(students);
export const applications = generateApplications();

// Dashboard statistics helper
export const getDashboardStats = (
  branchId?: string,
  startDate?: Date,
  endDate?: Date,
) => {
  let filteredStudents = students;
  let filteredPayments = payments;

  if (branchId) {
    filteredStudents = students.filter((s) => s.branchId === branchId);
    filteredPayments = payments.filter((p) => p.branchId === branchId);
  }

  if (startDate && endDate) {
    filteredPayments = filteredPayments.filter(
      (p) => p.paymentDate >= startDate && p.paymentDate <= endDate,
    );
  }

  const totalStudents = filteredStudents.length;
  const activeStudents = filteredStudents.filter(
    (s) => s.status === "ACTIVE",
  ).length;
  const totalCourses = courses.filter(
    (c) => !branchId || c.branchId === branchId,
  ).length;
  const totalStaff = staff.filter(
    (s) => !branchId || s.branchId === branchId,
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const feesCollectedToday = filteredPayments
    .filter((p) => p.paymentDate >= today)
    .reduce((sum, p) => sum + p.amount, 0);

  const monthlyRevenue = filteredPayments
    .filter((p) => {
      const now = new Date();
      return (
        p.paymentDate.getMonth() === now.getMonth() &&
        p.paymentDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, p) => sum + p.amount, 0);

  return {
    totalStudents,
    activeStudents,
    totalCourses,
    totalStaff,
    feesCollectedToday,
    monthlyRevenue,
    attendancePercentage: 85.5, // Mock attendance
  };
};
