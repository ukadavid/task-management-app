import { Request, Response } from "express";
import User from "../../model/users";
import Patient, { PatientDocument } from "../../model/patient";
import { Types as mongooseTypes } from "mongoose";

export const deleteUserOrPatient = async (req: Request, res: Response) => {
  try {
    const { entityType, entityId } = req.params;

    if (entityType === "user") {
      const objectIdUserId = new mongooseTypes.ObjectId(entityId);
      const deletedUser = await User.findByIdAndDelete(objectIdUserId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({ message: "User deleted successfully" });
    } else if (entityType === "patient") {
      const deletedPatient: PatientDocument | null =
        await Patient.findByIdAndDelete(entityId);

      if (!deletedPatient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      return res.status(200).json({ message: "Patient deleted successfully" });
    } else {
      return res.status(400).json({ message: "Invalid entity type" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};
