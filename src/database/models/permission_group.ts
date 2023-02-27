"use strict";
import { Model } from "sequelize";

interface permissionAttributes {
  permissionId: number;
  groupId: number;
  moduleId: number;
  subModuleId: number;
  status: number;
  isAll: boolean;
  isCreate: boolean;
  isView: boolean;
  isUpdate: boolean;
  isDelete: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Permission_Group
    extends Model<permissionAttributes>
    implements permissionAttributes
  {
    permissionId!: number;
    groupId!: number;
    moduleId!: number;
    subModuleId!: number;
    status!: number;
    isAll!: boolean;
    isCreate!: boolean;
    isView!: boolean;
    isUpdate!: boolean;
    isDelete!: boolean;

    static associate(models: any) {
      // define association here

      Permission_Group.belongsTo(models.User_Group, {
        foreignKey: "groupId",
        as: "User_Group",
      });

      Permission_Group.belongsTo(models.Module, {
        foreignKey: "moduleId",
        as: "Module",
      });

      Permission_Group.belongsTo(models.Sub_Module, {
        foreignKey: "subModuleId",
        as: "Sub_Module",
      });

      // Permission_Group.belongsTo(models.User_Access, {
      //   foreignKey: "accessId",
      //   as: "User_Access",
      // });
    }
  }

  Permission_Group.init(
    {
      permissionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      moduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subModuleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // accessId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      isAll: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isCreate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isView: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isUpdate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Permission_Group",
    }
  );
  return Permission_Group;
};
