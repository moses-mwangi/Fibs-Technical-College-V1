import sequelize from '../config/database';
import Branch from './Branch';
import User from './User';
import Student from './Student';
import Course from './Course';
import Staff from './Staff';
import Payment from './Payment';
import Attendance from './Attendance';
import Application from './Application';
import Timetable from './Timetable';
import Notification from './Notification';

// Define associations
const defineAssociations = () => {
  // Branch relationships
  Branch.hasMany(User, { foreignKey: 'branchId', as: 'users' });
  Branch.hasMany(Student, { foreignKey: 'branchId', as: 'students' });
  Branch.hasMany(Course, { foreignKey: 'branchId', as: 'courses' });
  Branch.hasMany(Staff, { foreignKey: 'branchId', as: 'staff' });
  Branch.hasMany(Payment, { foreignKey: 'branchId', as: 'payments' });
  Branch.hasMany(Attendance, { foreignKey: 'branchId', as: 'attendance' });
  Branch.hasMany(Application, { foreignKey: 'preferredBranchId', as: 'applications' });
  Branch.hasMany(Timetable, { foreignKey: 'branchId', as: 'timetables' });
  Branch.hasMany(Notification, { foreignKey: 'branchId', as: 'notifications' });

  // User relationships
  User.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
  User.hasMany(Payment, { foreignKey: 'createdBy', as: 'payments' });
  User.hasMany(Attendance, { foreignKey: 'markedBy', as: 'markedAttendance' });
  User.hasMany(Application, { foreignKey: 'reviewedBy', as: 'reviewedApplications' });
  User.hasMany(Notification, { foreignKey: 'recipientId', as: 'notifications' });

  // Student relationships
  Student.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
  Student.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
  Student.hasMany(Payment, { foreignKey: 'studentId', as: 'payments' });
  Student.hasMany(Attendance, { foreignKey: 'studentId', as: 'attendance' });

  // Course relationships
  Course.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
  Course.belongsTo(Staff, { foreignKey: 'lecturerId', as: 'lecturer' });
  Course.hasMany(Student, { foreignKey: 'courseId', as: 'students' });
  Course.hasMany(Attendance, { foreignKey: 'courseId', as: 'attendance' });
  Course.hasMany(Application, { foreignKey: 'preferredCourseId', as: 'applications' });
  Course.hasMany(Timetable, { foreignKey: 'courseId', as: 'timetables' });

  // Staff relationships
  Staff.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
  Staff.hasMany(Course, { foreignKey: 'lecturerId', as: 'courses' });
  Staff.hasMany(Timetable, { foreignKey: 'lecturerId', as: 'timetables' });

  // Payment relationships
  Payment.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
  Payment.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
  Payment.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

  // Attendance relationships
  Attendance.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
  Attendance.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
  Attendance.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
  Attendance.belongsTo(User, { foreignKey: 'markedBy', as: 'marker' });

  // Application relationships
  Application.belongsTo(Branch, { foreignKey: 'preferredBranchId', as: 'preferredBranch' });
  Application.belongsTo(Course, { foreignKey: 'preferredCourseId', as: 'preferredCourse' });
  Application.belongsTo(User, { foreignKey: 'reviewedBy', as: 'reviewer' });

  // Timetable relationships
  Timetable.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
  Timetable.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
  Timetable.belongsTo(Staff, { foreignKey: 'lecturerId', as: 'lecturer' });

  // Notification relationships
  Notification.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
  Notification.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });
};

// Initialize associations
defineAssociations();

// Export models and sequelize instance
export {
  sequelize,
  Branch,
  User,
  Student,
  Course,
  Staff,
  Payment,
  Attendance,
  Application,
  Timetable,
  Notification,
};

export default sequelize;
