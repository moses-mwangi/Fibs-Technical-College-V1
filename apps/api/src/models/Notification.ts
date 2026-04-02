import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface NotificationAttributes {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  recipientId?: string;
  recipientRole?: 'super_admin' | 'branch_admin' | 'lecturer' | 'accountant' | 'all';
  branchId?: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: string;
  public title!: string;
  public message!: string;
  public type!: 'info' | 'warning' | 'error' | 'success';
  public recipientId?: string;
  public recipientRole?: 'super_admin' | 'branch_admin' | 'lecturer' | 'accountant' | 'all';
  public branchId?: string;
  public isRead!: boolean;
  public actionUrl?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('info', 'warning', 'error', 'success'),
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    recipientRole: {
      type: DataTypes.ENUM('super_admin', 'branch_admin', 'lecturer', 'accountant', 'all'),
    },
    branchId: {
      type: DataTypes.UUID,
      references: {
        model: 'branches',
        key: 'id',
      },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    actionUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
  }
);

export default Notification;
