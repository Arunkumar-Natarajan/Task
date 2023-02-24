import { Router } from "express";
import moduleController from "../controller/module.controller";

const router = Router();

// API to list modules and sub-modules
router.route("/modules").get(moduleController.getAllModules);
router.route("/module/:moduleId").get(moduleController.getSubModule);

// API to map access and create a group
router.route("/group/create").post(moduleController.createGroup);
router.route("/group/permission/add").post(moduleController.addPermission);
router.route("/group/:groupId").get(moduleController.getGroup);
router
  .route("/group/delete/permission/:permissionId")
  .delete(moduleController.removePermission);

// API to get all access names.
router.route("/access/list").get(moduleController.getAllAccess);

export default router;
