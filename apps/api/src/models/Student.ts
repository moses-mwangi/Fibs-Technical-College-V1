import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface StudentAttributes {
  id: string;
  studentId: string;
  fullName: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  address: string;
  branchId: string;
  courseId: string;
  enrollmentDate: Date;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public id!: string;
  public studentId!: string;
  public fullName!: string;
  public gender!: 'male' | 'female';
  public dateOfBirth!: Date;
  public phoneNumber!: string;
  public email!: string;
  public address!: string;
  public branchId!: string;
  public courseId!: string;
  public enrollmentDate!: Date;
  public status!: 'active' | 'inactive' | 'graduated' | 'suspended';
  public photo?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    enrollmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'graduated', 'suspended'),
      defaultValue: 'active',
    },
    photo: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: true,
  }
);

export default Student;
