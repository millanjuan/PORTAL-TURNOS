import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema, Document } from "mongoose";
import { ISpeciality } from "./speciality.model";

export interface IProfessional extends Document {
  id: string;
  firstname: string;
  lastname: string;
  speciality: ISpeciality["_id"];
}

const ProfessionalSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true, default: uuidv4 },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  speciality: {
    type: Schema.Types.ObjectId,
    ref: "Speciality",
    required: true,
  },
});

ProfessionalSchema.pre<IProfessional>("save", function (next) {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});

export const Professional = mongoose.model<IProfessional>(
  "Professional",
  ProfessionalSchema
);
