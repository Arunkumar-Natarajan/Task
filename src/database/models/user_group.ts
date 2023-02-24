"use strict";
import { Model } from "sequelize";

interface userGroupAttributes {
  groupId: number;
  groupName: string;
  status: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User_Group
    extends Model<userGroupAttributes>
    implements userGroupAttributes
  {
    groupId!: number;
    groupName!: string;
    status!: number;
    static associate(models: any) {
      // define association here

      User_Group.hasMany(models.Permission_Group, {
        foreignKey: "groupId",
        as: "Permission_Group",
      });
    }
  }

  User_Group.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "User_Group",
    }
  );
  return User_Group;
};
