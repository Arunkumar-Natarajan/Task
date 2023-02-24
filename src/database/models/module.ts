"use strict";
import { Model } from "sequelize";

interface moduleAttributes {
  moduleId: number;
  name: string;
  status: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Module extends Model<moduleAttributes> implements moduleAttributes {
    moduleId!: number;
    name!: string;
    status!: number;

    static associate(models: any) {
      Module.hasMany(models.Sub_Module, {
        foreignKey: "moduleId",
        as: "Sub_Module",
      });
    }
  }

  Module.init(
    {
      moduleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Module",
    }
  );
  return Module;
};
