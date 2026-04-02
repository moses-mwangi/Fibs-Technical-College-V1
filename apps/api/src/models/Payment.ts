import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PaymentAttributes {
  id: string;
  receiptNumber: string;
  studentId: string;
  branchId: string;
  amount: number;
  paymentMethod: 'cash' | 'mpesa' | 'bank' | 'cheque';
  paymentDate: Date;
  description: string;
  semester?: string;
  academicYear?: string;
  status: 'pending' | 'completed' | 'failed';
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: string;
  public receiptNumber!: string;
  public studentId!: string;
  public branchId!: string;
  public amount!: number;
  public paymentMethod!: 'cash' | 'mpesa' | 'bank' | 'cheque';
  public paymentDate!: Date;
  public description!: string;
  public semester?: string;
  public academicYear?: string;
  public status!: 'pending' | 'completed' | 'failed';
  public createdBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    receiptNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM('cash', 'mpesa', 'bank', 'cheque'),
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
    },
    academicYear: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'completed',
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
  }
);

export default Payment;
