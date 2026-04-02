import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BranchAttributes {
  id: string;
  name: string;
  code: string;
  location: string;
  phoneNumber: string;
  branchManager: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BranchCreationAttributes extends Optional<BranchAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Branch extends Model<BranchAttributes, BranchCreationAttributes> implements BranchAttributes {
  public id!: string;
  public name!: string;
  public code!: string;
  public location!: string;
  public phoneNumber!: string;
  public branchManager!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Branch.init(
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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branchManager: {
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
    modelName: 'Branch',
    tableName: 'branches',
    timestamps: true,
  }
);

export default Branch;
