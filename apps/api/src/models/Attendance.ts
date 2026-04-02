import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AttendanceAttributes {
  id: string;
  studentId: string;
  branchId: string;
  courseId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkInTime?: Date;
  checkOutTime?: Date;
  markedBy: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AttendanceCreationAttributes extends Optional<AttendanceAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Attendance extends Model<AttendanceAttributes, AttendanceCreationAttributes> implements AttendanceAttributes {
  public id!: string;
  public studentId!: string;
  public branchId!: string;
  public courseId!: string;
  public date!: Date;
  public status!: 'present' | 'absent' | 'late' | 'excused';
  public checkInTime?: Date;
  public checkOutTime?: Date;
  public markedBy!: string;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Attendance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id',
      },
    },
    branchId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'branches',
        key: 'id',
      },
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('present', 'absent', 'late', 'excused'),
      allowNull: false,
    },
    checkInTime: {
      type: DataTypes.TIME,
    },
    checkOutTime: {
      type: DataTypes.TIME,
    },
    markedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Attendance',
    tableName: 'attendance',
    timestamps: true,
  }
);

export default Attendance;
