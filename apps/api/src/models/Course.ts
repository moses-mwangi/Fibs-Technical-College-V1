import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CourseAttributes {
  id: string;
  name: string;
  code: string;
  description: string;
  duration: string;
  branchId: string;
  lecturerId?: string;
  fees: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  public id!: string;
  public name!: string;
  public code!: string;
  public description!: string;
  public duration!: string;
  public branchId!: string;
  public lecturerId?: string;
  public fees!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
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
    lecturerId: {
      type: DataTypes.UUID,
      references: {
        model: 'staff',
        key: 'id',
      },
    },
    fees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: true,
  }
);

export default Course;
