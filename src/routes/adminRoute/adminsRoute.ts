import express from "express";
import { createAdmin, loginAdmin } from "../../controller/userController";
import { createAdminValidator } from "../../utils/utils";
import {
  getAllUsers,
  deleteUser,
  getUser,
} from "../../controller/adminController";

const router = express.Router();

router.post("/register", createAdminValidator, createAdmin);
router.post("/login", loginAdmin);

// User Route
router.get("/getUsers", getAllUsers);
router.delete("/:id", deleteUser);
router.get("/getUser", getUser);

export default router;
