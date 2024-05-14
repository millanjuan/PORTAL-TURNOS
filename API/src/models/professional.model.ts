import mongoose, { Schema, Document } from "mongoose";
import { ISpeciality } from "./speciality.model";

export interface IProfessional extends Document {
  firstname: string;
  lastname: string;
  image: string;
  speciality: ISpeciality["_id"];
}

const ProfessionalSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  image: { type: String, required: true },
  speciality: {
    type: Schema.Types.ObjectId,
    ref: "Speciality",
    required: true,
  },
});

export const Professional = mongoose.model<IProfessional>(
  "Professional",
  ProfessionalSchema
);
