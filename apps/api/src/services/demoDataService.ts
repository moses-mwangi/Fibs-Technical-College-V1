import * as fs from 'fs';
import * as path from 'path';

const dataDir = path.join(__dirname, '../data');

export interface DemoData {
  branches: any[];
  users: any[];
  courses: any[];
  students: any[];
  staff: any[];
  payments: any[];
  applications: any[];
  attendance: any[];
  timetables: any[];
  notifications: any[];
}

class DemoDataService {
  private data: DemoData | null = null;

  private loadData(): DemoData {
    if (this.data) {
      return this.data;
    }

    try {
      this.data = {
        branches: JSON.parse(fs.readFileSync(path.join(dataDir, 'branches.json'), 'utf8')),
        users: JSON.parse(fs.readFileSync(path.join(dataDir, 'users.json'), 'utf8')),
        courses: JSON.parse(fs.readFileSync(path.join(dataDir, 'courses.json'), 'utf8')),
        students: JSON.parse(fs.readFileSync(path.join(dataDir, 'students.json'), 'utf8')),
        staff: JSON.parse(fs.readFileSync(path.join(dataDir, 'staff.json'), 'utf8')),
        payments: JSON.parse(fs.readFileSync(path.join(dataDir, 'payments.json'), 'utf8')),
        applications: JSON.parse(fs.readFileSync(path.join(dataDir, 'applications.json'), 'utf8')),
        attendance: [],
        timetables: [],
        notifications: []
      };
    } catch (error) {
      console.error('Error loading demo data:', error);
      this.data = {
        branches: [],
        users: [],
        courses: [],
        students: [],
        staff: [],
        payments: [],
        applications: [],
        attendance: [],
        timetables: [],
        notifications: []
      };
    }

    return this.data;
  }

  getBranches() {
    return this.loadData().branches;
  }

  getUsers() {
    return this.loadData().users;
  }

  getCourses() {
    return this.loadData().courses;
  }

  getStudents() {
    return this.loadData().students;
  }

  getStaff() {
    return this.loadData().staff;
  }

  getPayments() {
    return this.loadData().payments;
  }

  getApplications() {
    return this.loadData().applications;
  }

  getAttendance() {
    return this.loadData().attendance;
  }

  getTimetables() {
    return this.loadData().timetables;
  }

  getNotifications() {
    return this.loadData().notifications;
  }

  // Helper methods for finding data
  findUserByEmail(email: string) {
    return this.getUsers().find(user => user.email === email);
  }

  findUserById(id: string) {
    return this.getUsers().find(user => user.id === id);
  }

  findBranchById(id: string) {
    return this.getBranches().find(branch => branch.id === id);
  }

  findCourseById(id: string) {
    return this.getCourses().find(course => course.id === id);
  }

  findStudentById(id: string) {
    return this.getStudents().find(student => student.id === id);
  }

  findStaffById(id: string) {
    return this.getStaff().find(staff => staff.id === id);
  }

  findPaymentById(id: string) {
    return this.getPayments().find(payment => payment.id === id);
  }

  findApplicationById(id: string) {
    return this.getApplications().find(application => application.id === id);
  }

  // Filter methods
  getStudentsByBranch(branchId: string) {
    return this.getStudents().filter(student => student.branchId === branchId);
  }

  getStudentsByCourse(courseId: string) {
    return this.getStudents().filter(student => student.courseId === courseId);
  }

  getStaffByBranch(branchId: string) {
    return this.getStaff().filter(staff => staff.branchId === branchId);
  }

  getCoursesByBranch(branchId: string) {
    return this.getCourses().filter(course => course.branchId === branchId);
  }

  getPaymentsByBranch(branchId: string) {
    return this.getPayments().filter(payment => payment.branchId === branchId);
  }

  getPaymentsByStudent(studentId: string) {
    return this.getPayments().filter(payment => payment.studentId === studentId);
  }

  getApplicationsByStatus(status: string) {
    return this.getApplications().filter(application => application.status === status);
  }

  getApplicationsByBranch(branchId: string) {
    return this.getApplications().filter(application => application.preferredBranchId === branchId);
  }

  // Statistics methods
  getTotalStudents() {
    return this.getStudents().length;
  }

  getActiveStudents() {
    return this.getStudents().filter(student => student.status === 'active').length;
  }

  getTotalCourses() {
    return this.getCourses().length;
  }

  getTotalStaff() {
    return this.getStaff().length;
  }

  getFeesCollectedToday() {
    const today = new Date().toISOString().split('T')[0];
    return this.getPayments()
      .filter(payment => payment.paymentDate === today && payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
  }

  getMonthlyRevenue() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return this.getPayments()
      .filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate.getMonth() === currentMonth && 
               paymentDate.getFullYear() === currentYear && 
               payment.status === 'completed';
      })
      .reduce((sum, payment) => sum + payment.amount, 0);
  }

  getAttendancePercentage() {
    // For demo purposes, return a fixed percentage
    return 85.5;
  }

  getStudentEnrollmentTrends() {
    // Mock enrollment trends for the last 6 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      month,
      enrollments: Math.floor(Math.random() * 20) + 10 + index * 2
    }));
  }

  getMonthlyRevenueTrends() {
    // Mock revenue trends for the last 6 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 500000) + 200000
    }));
  }

  getBranchComparison() {
    return this.getBranches().map(branch => ({
      name: branch.name,
      students: this.getStudentsByBranch(branch.id).length,
      revenue: this.getPaymentsByBranch(branch.id)
        .filter(p => p.status === 'completed')
        .reduce((sum, payment) => sum + payment.amount, 0)
    }));
  }
}

export default new DemoDataService();
