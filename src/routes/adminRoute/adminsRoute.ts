import express from "express";
import { createAdminValidator } from "../../utils/utils";
import {
  getAllUsers,
  getUser,
} from "../../controller/adminController/getAllUsers";
import { getAllPatient } from "../../controller/adminController/getAllPatients";
import { createAdmin } from "../../controller/adminController/adminSignup";
import { loginAdmin } from "../../controller/adminController/adminLogin";
import { deletePatient } from "../../controller/adminController/deletePatient";
import { deleteUser } from "../../controller/adminController/deleteUser";

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);

// User Route
router.get("/getUsers", getAllUsers);
router.get("/getUser/:id", getUser);

//patient Route
router.get("/getPatients", getAllPatient);
router.delete("/deletePatient/:patientId", deletePatient);
router.delete("/deleteUser/:id", deleteUser);

export default router;
