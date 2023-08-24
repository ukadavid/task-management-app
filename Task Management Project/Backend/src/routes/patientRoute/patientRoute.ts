import express from "express";
import { createPatient } from "../../controller/patientController/createPatient";
import { searchPatient } from "../../controller/patientController/searchPatient";

const router = express.Router();

router.post("/createPatient", createPatient);
router.get("/searchPatient", searchPatient);

export default router;
