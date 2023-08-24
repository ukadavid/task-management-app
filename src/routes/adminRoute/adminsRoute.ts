import express from "express";
import {
  createAdmin,
  loginAdmin,
} from "../../controller/userController/userController";
import { createAdminValidator } from "../../utils/utils";
import {
  getAllUsers,
  deleteUser,
  getUser,
} from "../../controller/adminController/getAllUsers";
import { getAllPatient } from "../../controller/adminController/getAllPatients";
import { deletePatient } from "../../controller/adminController/deletePatient";

const router = express.Router();

router.post("/register", createAdminValidator, createAdmin);
router.post("/login", loginAdmin);

// User Route
router.get("/getUsers", getAllUsers);
router.delete("/:id", deleteUser);
router.get("/getUser", getUser);

//patient Route
router.get("/getPatients", getAllPatient);
router.delete("/:id", deletePatient);

export default router;
