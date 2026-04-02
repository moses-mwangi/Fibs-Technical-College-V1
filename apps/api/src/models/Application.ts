import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ApplicationAttributes {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
  address: string;
  preferredBranchId: string;
  preferredCourseId: string;
  educationBackground: string;
  status: 'pending' | 'approved' | 'rejected' | 'converted';
  notes?: string;
  applicationDate: Date;
  reviewedBy?: string;
  reviewDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes> implements ApplicationAttributes {
  public id!: string;
  public applicationNumber!: string;
  public fullName!: string;
  public email!: string;
  public phoneNumber!: string;
  public dateOfBirth!: Date;
  public gender!: 'male' | 'female';
  public address!: string;
  public preferredBranchId!: string;
  public preferredCourseId!: string;
  public educationBackground!: string;
  public status!: 'pending' | 'approved' | 'rejected' | 'converted';
  public notes?: string;
  public applicationDate!: Date;
  public reviewedBy?: string;
  public reviewDate?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Application.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    applicationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    preferredBranchId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'branches',
        key: 'id',
      },
    },
    preferredCourseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
    },
    educationBackground: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'converted'),
      defaultValue: 'pending',
    },
    notes: {
      type: DataTypes.TEXT,
    },
    applicationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reviewedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    reviewDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Application',
    tableName: 'applications',
    timestamps: true,
  }
);

export default Application;
