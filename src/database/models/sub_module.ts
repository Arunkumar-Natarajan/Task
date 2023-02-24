"use strict";
import { Model } from "sequelize";

interface subModuleAttributes {
  subModuleId: number;
  name: string;
  moduleId: number;
  status: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Sub_Module
    extends Model<subModuleAttributes>
    implements subModuleAttributes
  {
    subModuleId!: number;
    name!: string;
    moduleId!: number;
    status!: number;

    static associate(models: any) {
      Sub_Module.belongsTo(models.Module, {
        foreignKey: "moduleId",
        as: "Module",
      });
    }
  }
  Sub_Module.init(
    {
      subModuleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      moduleId: {
        type: DataTypes.INTEGER,
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
      modelName: "Sub_Module",
    }
  );
  return Sub_Module;
};
