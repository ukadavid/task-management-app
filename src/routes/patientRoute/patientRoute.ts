import express from "express";
import { createPatient } from "../../controller/PatientController/createPatient";
import { searchPatient } from "../../controller/PatientController/searchPatient";

const router = express.Router();

router.post("/createPatient", createPatient);
router.get("/searchPatient", searchPatient);

export default router;
