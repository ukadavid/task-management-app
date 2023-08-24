import mongoose, { Schema, Document } from "mongoose";

export interface PatientDocument extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  height: number;
  weight: number;
  bmiIndex: number;
}

const patientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  height: { type: Number },
  weight: { type: Number },
  bmiIndex: { type: Number },
});

patientSchema.pre<PatientDocument>("save", function (next) {
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    this.bmiIndex = this.weight / (heightInMeters * heightInMeters);
  }
  next();
});

const Patient = mongoose.model<PatientDocument>("Patient", patientSchema);

export default Patient;
