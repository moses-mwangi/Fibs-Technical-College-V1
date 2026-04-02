// Demo data for FIBS College Management System

export interface Branch {
  id: string;
  name: string;
  code: string;
  location: string;
  phoneNumber: string;
  branchManager: string;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'branch_admin' | 'lecturer' | 'accountant';
  branchId?: string;
  phoneNumber?: string;
  isActive: boolean;
  lastLogin?: string;
  password: string; // In production, this would be hashed
}

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
  branchId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
  photo?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  duration: string;
  branchId: string;
  lecturerId?: string;
  isActive: boolean;
  fees: number;
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  department: string;
  branchId: string;
  isActive: boolean;
  hireDate: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'mpesa' | 'bank_transfer' | 'cheque';
  transactionId?: string;
  branchId: string;
  receiptNumber: string;
  description: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  branchId: string;
  courseId: string;
  markedBy: string;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  address: string;
  preferredCourseId: string;
  preferredBranchId: string;
  applicationDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  notes?: string;
}

// Demo Branches
export const demoBranches: Branch[] = [
  {
    id: 'branch-1',
    name: 'FIBS Eldoret Campus',
    code: 'ELD',
    location: 'Eldoret Town, Kenya',
    phoneNumber: '+254 712 345 678',
    branchManager: 'John Kamau',
    isActive: true
  },
  {
    id: 'branch-2',
    name: 'FIBS Nairobi Campus',
    code: 'NBO',
    location: 'Nairobi CBD, Kenya',
    phoneNumber: '+254 723 456 789',
    branchManager: 'Mary Wanjiru',
    isActive: true
  },
  {
    id: 'branch-3',
    name: 'FIBS Kisumu Campus',
    code: 'KSM',
    location: 'Kisumu City, Kenya',
    phoneNumber: '+254 734 567 890',
    branchManager: 'David Ochieng',
    isActive: true
  }
];

// Demo Users
export const demoUsers: User[] = [
  {
    id: 'user-1',
    email: 'superadmin@fibscollege.com',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'super_admin',
    isActive: true,
    password: 'Admin123'
  },
  {
    id: 'user-2',
    email: 'eldoretadmin@fibscollege.com',
    firstName: 'Eldoret',
    lastName: 'Admin',
    role: 'branch_admin',
    branchId: 'branch-1',
    isActive: true,
    password: 'Admin123'
  },
  {
    id: 'user-3',
    email: 'lecturer@fibscollege.com',
    firstName: 'James',
    lastName: 'Muriuki',
    role: 'lecturer',
    branchId: 'branch-1',
    isActive: true,
    password: 'Lecturer123'
  },
  {
    id: 'user-4',
    email: 'accounts@fibscollege.com',
    firstName: 'Grace',
    lastName: 'Wanjala',
    role: 'accountant',
    branchId: 'branch-1',
    isActive: true,
    password: 'Accounts123'
  }
];

// Demo Courses
export const demoCourses: Course[] = [
  {
    id: 'course-1',
    name: 'ICT (Information Communication Technology)',
    code: 'ICT001',
    description: 'Comprehensive ICT training covering programming, networking, and database management',
    duration: '6 months',
    branchId: 'branch-1',
    lecturerId: 'user-3',
    isActive: true,
    fees: 45000
  },
  {
    id: 'course-2',
    name: 'Driving School',
    code: 'DRV001',
    description: 'Professional driving lessons for both manual and automatic vehicles',
    duration: '3 months',
    branchId: 'branch-1',
    isActive: true,
    fees: 25000
  },
  {
    id: 'course-3',
    name: 'Electrical Engineering',
    code: 'EE001',
    description: 'Electrical installation, maintenance, and repair training',
    duration: '4 months',
    branchId: 'branch-2',
    isActive: true,
    fees: 35000
  },
  {
    id: 'course-4',
    name: 'Plumbing',
    code: 'PLB001',
    description: 'Professional plumbing installation and maintenance',
    duration: '3 months',
    branchId: 'branch-2',
    isActive: true,
    fees: 30000
  },
  {
    id: 'course-5',
    name: 'Business Management',
    code: 'BM001',
    description: 'Business administration and management skills',
    duration: '6 months',
    branchId: 'branch-3',
    isActive: true,
    fees: 40000
  },
  {
    id: 'course-6',
    name: 'Computer Packages',
    code: 'CP001',
    description: 'Basic computer skills and office packages',
    duration: '2 months',
    branchId: 'branch-3',
    isActive: true,
    fees: 15000
  }
];

// Demo Staff
export const demoStaff: Staff[] = [
  {
    id: 'staff-1',
    firstName: 'James',
    lastName: 'Muriuki',
    email: 'james.muriuki@fibscollege.com',
    phoneNumber: '+254 712 123 456',
    role: 'Lecturer',
    department: 'ICT',
    branchId: 'branch-1',
    isActive: true,
    hireDate: '2023-01-15'
  },
  {
    id: 'staff-2',
    firstName: 'Grace',
    lastName: 'Wanjala',
    email: 'grace.wanjala@fibscollege.com',
    phoneNumber: '+254 712 234 567',
    role: 'Accountant',
    department: 'Finance',
    branchId: 'branch-1',
    isActive: true,
    hireDate: '2022-06-10'
  },
  {
    id: 'staff-3',
    firstName: 'Michael',
    lastName: 'Karanja',
    email: 'michael.karanja@fibscollege.com',
    phoneNumber: '+254 723 345 678',
    role: 'Lecturer',
    department: 'Engineering',
    branchId: 'branch-2',
    isActive: true,
    hireDate: '2023-03-20'
  },
  {
    id: 'staff-4',
    firstName: 'Sarah',
    lastName: 'Otieno',
    email: 'sarah.otieno@fibscollege.com',
    phoneNumber: '+254 734 456 789',
    role: 'Administrator',
    department: 'Administration',
    branchId: 'branch-3',
    isActive: true,
    hireDate: '2022-09-15'
  }
];

// Generate Demo Students
export const generateDemoStudents = (): Student[] => {
  const firstNames = ['John', 'Mary', 'David', 'Sarah', 'Michael', 'Grace', 'James', 'Esther', 'Peter', 'Ruth', 
                     'Daniel', 'Rebecca', 'Samuel', 'Hannah', 'Benjamin', 'Naomi', 'Joseph', 'Rachel', 'Aaron', 'Leah'];
  const lastNames = ['Kamau', 'Wanjiru', 'Muriuki', 'Wanjala', 'Karanja', 'Otieno', 'Njoroge', 'Mwangi', 'Ochieng', 'Adhiambo',
                    'Mutua', 'Muli', 'Kiplagat', 'Chebet', 'Kiprop', 'Juma', 'Said', 'Mohamed', 'Ali', 'Hassan'];
  
  const students: Student[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const branchId = demoBranches[Math.floor(Math.random() * demoBranches.length)].id;
    const branchCourses = demoCourses.filter(course => course.branchId === branchId);
    const courseId = branchCourses[Math.floor(Math.random() * branchCourses.length)].id;
    
    const enrollmentDate = new Date(2023 + Math.floor(Math.random() * 2), 
                                   Math.floor(Math.random() * 12), 
                                   Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0];
    
    const dateOfBirth = new Date(1995 + Math.floor(Math.random() * 10), 
                                Math.floor(Math.random() * 12), 
                                Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0];
    
    students.push({
      id: `student-${i}`,
      studentId: `STU${String(i).padStart(4, '0')}`,
      firstName,
      lastName,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      dateOfBirth,
      phoneNumber: `+254 7${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`,
      address: `${Math.floor(Math.random() * 100) + 1} ${firstName} Street, ${Math.random() > 0.5 ? 'Eldoret' : Math.random() > 0.5 ? 'Nairobi' : 'Kisumu'}`,
      branchId,
      courseId,
      enrollmentDate,
      status: Math.random() > 0.1 ? 'active' : 'inactive'
    });
  }
  
  return students;
};

export const demoStudents = generateDemoStudents();

// Generate Demo Payments
export const generateDemoPayments = (): Payment[] => {
  const payments: Payment[] = [];
  let receiptCounter = 1000;
  
  demoStudents.slice(0, 30).forEach(student => {
    const numPayments = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numPayments; i++) {
      const paymentDate = new Date(2024, Math.floor(Math.random() * 12), 
                                   Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0];
      
      payments.push({
        id: `payment-${payments.length + 1}`,
        studentId: student.id,
        amount: Math.floor(Math.random() * 20000) + 5000,
        paymentDate,
        paymentMethod: ['cash', 'mpesa', 'bank_transfer', 'cheque'][Math.floor(Math.random() * 4)] as any,
        transactionId: Math.random() > 0.3 ? `TXN${Math.floor(Math.random() * 1000000)}` : undefined,
        branchId: student.branchId,
        receiptNumber: `RCP${receiptCounter++}`,
        description: 'Course fees payment'
      });
    }
  });
  
  return payments;
};

export const demoPayments = generateDemoPayments();

// Generate Demo Attendance
export const generateDemoAttendance = (): Attendance[] => {
  const attendance: Attendance[] = [];
  const today = new Date();
  
  demoStudents.slice(0, 20).forEach(student => {
    for (let day = 0; day < 30; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() - day);
      
      if (date.getDay() >= 1 && date.getDay() <= 5) { // Weekdays only
        attendance.push({
          id: `attendance-${attendance.length + 1}`,
          studentId: student.id,
          date: date.toISOString().split('T')[0],
          status: Math.random() > 0.2 ? 'present' : Math.random() > 0.5 ? 'late' : 'absent' as any,
          branchId: student.branchId,
          courseId: student.courseId,
          markedBy: demoStaff[Math.floor(Math.random() * demoStaff.length)].id
        });
      }
    }
  });
  
  return attendance;
};

export const demoAttendance = generateDemoAttendance();

// Generate Demo Applications
export const generateDemoApplications = (): Application[] => {
  const applications: Application[] = [];
  const firstNames = ['Alex', 'Brian', 'Chris', 'Diana', 'Eric', 'Faith', 'George', 'Helen', 'Ian', 'Joy'];
  const lastNames = 'Muriuki Njoroge Wanjiru Kamau Karanja Otieno Ochieng Adhiambo Mohamed Ali'.split(' ');
  
  for (let i = 1; i <= 20; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const applicationDate = new Date(2024, Math.floor(Math.random() * 12), 
                                     Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0];
    
    applications.push({
      id: `application-${i}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`,
      phoneNumber: `+254 7${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      dateOfBirth: new Date(1995 + Math.floor(Math.random() * 10), 
                           Math.floor(Math.random() * 12), 
                           Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      address: `${Math.floor(Math.random() * 100) + 1} Application Street`,
      preferredCourseId: demoCourses[Math.floor(Math.random() * demoCourses.length)].id,
      preferredBranchId: demoBranches[Math.floor(Math.random() * demoBranches.length)].id,
      applicationDate,
      status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random() * 3)] as any,
      notes: Math.random() > 0.7 ? 'Good candidate, recommend acceptance' : undefined
    });
  }
  
  return applications;
};

export const demoApplications = generateDemoApplications();

// Export all demo data
export const demoData = {
  branches: demoBranches,
  users: demoUsers,
  courses: demoCourses,
  staff: demoStaff,
  students: demoStudents,
  payments: demoPayments,
  attendance: demoAttendance,
  applications: demoApplications
};
