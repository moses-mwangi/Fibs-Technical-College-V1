import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TimetableAttributes {
  id: string;
  branchId: string;
  courseId: string;
  lecturerId: string;
  room: string;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  semester: string;
  academicYear: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TimetableCreationAttributes extends Optional<TimetableAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Timetable extends Model<TimetableAttributes, TimetableCreationAttributes> implements TimetableAttributes {
  public id!: string;
  public branchId!: string;
  public courseId!: string;
  public lecturerId!: string;
  public room!: string;
  public dayOfWeek!: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  public startTime!: string;
  public endTime!: string;
  public semester!: string;
  public academicYear!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Timetable.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    lecturerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'id',
      },
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayOfWeek: {
      type: DataTypes.ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    academicYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Timetable',
    tableName: 'timetables',
    timestamps: true,
  }
);

export default Timetable;
