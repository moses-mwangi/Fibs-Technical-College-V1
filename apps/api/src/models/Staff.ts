import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface StaffAttributes {
  id: string;
  staffId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: 'lecturer' | 'admin' | 'accountant' | 'support' | 'manager';
  department: string;
  branchId: string;
  isActive: boolean;
  hireDate: Date;
  salary?: number;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StaffCreationAttributes extends Optional<StaffAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Staff extends Model<StaffAttributes, StaffCreationAttributes> implements StaffAttributes {
  public id!: string;
  public staffId!: string;
  public fullName!: string;
  public email!: string;
  public phoneNumber!: string;
  public role!: 'lecturer' | 'admin' | 'accountant' | 'support' | 'manager';
  public department!: string;
  public branchId!: string;
  public isActive!: boolean;
  public hireDate!: Date;
  public salary?: number;
  public address?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Staff.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    staffId: {
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
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('lecturer', 'admin', 'accountant', 'support', 'manager'),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    hireDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
    },
    address: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Staff',
    tableName: 'staff',
    timestamps: true,
  }
);

export default Staff;
