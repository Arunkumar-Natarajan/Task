"use strict";
import { Model } from "sequelize";

interface accessAttributes {
  accessId: number;
  accessName: string;
  status: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User_Access
    extends Model<accessAttributes>
    implements accessAttributes
  {
    accessId!: number;
    accessName!: string;
    status!: number;

    static associate(models: any) {
      // define association here
    }
  }
  User_Access.init(
    {
      accessId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      accessName: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "User_Access",
    }
  );
  return User_Access;
};
