import db from "../database/models";
import { Op } from "sequelize";
import { constantsCode } from "../config/constants";

class ModuleService {
  /** Function to get all module details.
   * no params passed.
   * @returns All modules name as object.
   */

  getAllModule = async () => {
    try {
      let getAllModule = await db.Module.findAll({
        attributes: ["moduleId", "name"],
        where: { status: constantsCode.status.Active },
      });

      return getAllModule;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Function to return module details with sub-module info.
   * @param moduleId Module Id to get module name.
   * @returns  returns all module and sub modules detail.
   */

  getAllSubModules = async (moduleId: number) => {
    try {
      let getSubModules = await db.Module.findOne({
        attributes: ["moduleId", "name"],
        include: {
          model: db.Sub_Module,
          as: "Sub_Module",
          attributes: ["subModuleId", "name"],
        },
        where: {
          moduleId: moduleId,
          status: constantsCode.status.Active,
        },
      });

      if (!getSubModules) {
        return {
          status: false,
        };
      }

      return { status: true, data: getSubModules };
    } catch (error) {
      console.log("error ======>", error);
      throw error;
    }
  };

  /**
   * Function to create a user group.
   * @param payload input data for user group.
   * @returns returns created group info.
   */

  createUserGroup = async (payload: any) => {
    try {
      let isGroupNameExist = await db.User_Group.findOne({
        where: {
          groupName: { [Op.like]: `%${payload.groupName}%` },
          status: 1,
        },
      });

      if (isGroupNameExist) {
        return {
          status: false,
        };
      }

      let createGroup = await db.User_Group.create(payload);

      return { status: true, data: createGroup };
    } catch (error) {
      throw error;
    }
  };

  /**
   * Function to add permission to user group.
   * @param payload Input data to map module permission.
   * @returns returns mapped permissons id.
   */

  addGroupPermission = async (payload: any) => {
    try {
      let addPermission = await db.Permission_Group.bulkCreate(payload);

      return { status: true, data: addPermission };
    } catch (error) {
      console.log("error ====>", error);
      throw error;
    }
  };

  /**
   * Function to return user group info with permission details.
   * @param groupId groupId to get details.
   * @returns return group info as object.
   */

  getGroupById = async (groupId: number) => {
    try {
      let groupData = await db.User_Group.findAll({
        attributes: ["groupId", "groupName"],
        include: {
          model: db.Permission_Group,
          as: "Permission_Group",
          attributes: {
            exclude: [
              "groupId",
              "moduleId",
              "subModuleId",
              "createdAt",
              "updatedAt",
            ],
          },
          required: false,
          where: { status: constantsCode.status.Active },
          include: [
            {
              model: db.Module,
              as: "Module",
              attributes: ["moduleId", "name"],
            },
            {
              model: db.Sub_Module,
              as: "Sub_Module",
              attributes: ["subModuleId", "name"],
            },
          ],
        },
        where: {
          groupId: groupId,
          status: constantsCode.status.Active,
        },
      });

      if (!groupData) {
        return {
          status: false,
        };
      }

      let result: any;

      if (groupData.length > 0) {
        result = groupData[0].Permission_Group.map((el: any) => {
          return {
            permissionId: el.permissionId ? el.permissionId : null,
            moduleName: el.Module.name ? el.Module.name : null,
            subModuleName: el.Sub_Module.name ? el.Sub_Module.name : null,
            isAll: el.isAll,
            isView: el.isView,
            isCreate: el.isCreate,
            isUpdate: el.isUpdate,
            isDelete: el.isDelete,
          };
        });

        result = {
          groupId: groupData[0].groupId ? groupData[0].groupId : null,
          groupName: groupData[0].groupName ? groupData[0].groupName : null,
          accessInfo: result,
        };
      } else {
        result = groupData;
      }

      return { status: true, data: result };
    } catch (error) {
      console.log("error ==>", error);
      throw error;
    }
  };

  removePermissionById = async (permissionId: number, payload: object) => {
    try {
      let removePermission = await db.Permission_Group.update(payload, {
        where: { permissionId: permissionId },
      });

      return removePermission;
    } catch (error) {
      throw error;
    }
  };

  deleteModuleByPermissionId = async (permissionId: number) => {
    try {
      let deleteModule = await db.Permission_Group.update(
        { status: constantsCode.status.Deleted },
        { where: { permissionId: permissionId } }
      );

      return deleteModule;
    } catch (error) {
      throw error;
    }
  };

  listAllAccess = async () => {
    try {
      let getAllAccess = await db.User_Access.findAll({
        attributes: ["accessId", "accessName"],
        where: { status: constantsCode.status.Active },
      });

      return {
        status: true,
        data: getAllAccess,
      };
    } catch (error) {
      throw error;
    }
  };
}

export default new ModuleService();
