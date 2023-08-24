import express from "express";
import { createAdminValidator } from "../../utils/utils";
import {
  getAllUsers,
  deleteUser,
  getUser,
} from "../../controller/adminController/getAllUsers";
import { getAllPatient } from "../../controller/adminController/getAllPatients";
import { deletePatient } from "../../controller/adminController/deletePatient";
import { createAdmin } from "../../controller/adminController/adminSignup";
import { loginAdmin } from "../../controller/adminController/adminLogin";

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);

// User Route
router.get("/getUsers", getAllUsers);
router.delete("/:id", deleteUser);
router.get("/getUser", getUser);

//patient Route
router.get("/getPatients", getAllPatient);
router.delete("/:id", deletePatient);

export default router;
