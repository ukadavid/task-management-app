import express from "express";
import { createAdminValidator } from "../../utils/utils";
import {
  getAllUsers,
  getUser,
} from "../../controller/adminController/getAllUsers";
import { getAllPatient } from "../../controller/adminController/getAllPatients";
import { createAdmin } from "../../controller/adminController/adminSignup";
import { loginAdmin } from "../../controller/adminController/adminLogin";
import { deleteUserOrPatient } from "../../controller/adminController/deleteUserOrPatient";

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);

// User Route
router.get("/getUsers", getAllUsers);
router.get("/getUser", getUser);

//patient Route
router.get("/getPatients", getAllPatient);
router.delete("delete/:id", deleteUserOrPatient);

export default router;
