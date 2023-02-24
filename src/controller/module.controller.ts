import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse, internalServerError } from "../utils/response";
import { statusCodes } from "../config/httpCodes";
import { message } from "../config/messages";
import moduleService from "../service/module.service";

class ModuleController {
  getAllModules = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const getAllData = await moduleService.getAllModule();

      return sendSuccessResponse(
        req,
        res,
        statusCodes.HTTP_OK,
        message.success,
        getAllData
      );
    } catch (error) {
      return internalServerError(
        req,
        res,
        statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        error
      );
    }
  };

  getSubModule = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      let moduleId: number = Number(req.params.moduleId);

      let getSubModule = await moduleService.getAllSubModules(moduleId);

      if (!getSubModule.status) {
        return sendSuccessResponse(
          req,
          res,
          statusCodes.HTTP_NOT_FOUND,
          message.moduleNotExist,
          []
        );
      }

      return sendSuccessResponse(
        req,
        res,
        statusCodes.HTTP_OK,
        message.success,
        getSubModule.data
      );
    } catch (error) {
      return internalServerError(
        req,
        res,
        statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        error
      );
    }
  };

  createGroup = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      let createGroup = await moduleService.createUserGroup(req.body);

      if (!createGroup.status) {
        return sendSuccessResponse(
          req,
          res,
          statusCodes.HTTP_BAD_REQUEST,
          message.groupNameExist,
          []
        );
      }

      return sendSuccessResponse(
        req,
        res,
        statusCodes.HTTP_CREATED,
        message.success,
        createGroup.data
      );
    } catch (error) {
      return internalServerError(
        req,
        res,
        statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        error
      );
    }
  };

  addPermission = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      let addGroupPermission = await moduleService.addGroupPermission(req.body);

      return sendSuccessResponse(
        req,
        res,
        statusCodes.HTTP_CREATED,
        message.success,
        addGroupPermission.data
      );
    } catch (error) {
      return internalServerError(
        req,
        res,
        statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        error
      );
    }
  };

  getGroup = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      let groupId: number = Number(req.params.groupId);

      let getGroupById = await moduleService.getGroupById(groupId);

      if (!getGroupById.status) {
        return sendSuccessResponse(
          req,
          res,
          statusCodes.HTTP_NOT_FOUND,
          message.groupNameNotExist,
          []
        );
      }

      return sendSuccessResponse(
        req,
        res,
        statusCodes.HTTP_OK,
        message.success,
        getGroupById.data
      );
    } catch (error) {
      return internalServerError(
        req,
        res,
        statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        error
      );
    }
  };

  removePermission = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      let permissionId: number = Number(req.params.permissionId);

      let deletePermission = await moduleService.removePermissionById(
        permissionId
      );

      return sendSuccessResponse(
        req,
        res,
        statusCodes.HTTP_OK,
        message.permissionRemoved,
        deletePermission
      );
    } catch (error) {
      return internalServerError(
        req,
        res,
        statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        error
      );
    }
  };

  getAllAccess = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      let getAccess = await moduleService.listAllAccess();

      return sendSuccessResponse(
        req,
        res,
        statusCodes.HTTP_OK,
        message.success,
        getAccess.data
      );
    } catch (error) {
      return internalServerError(
        req,
        res,
        statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        error
      );
    }
  };
}

export default new ModuleController();
