import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema, Document } from "mongoose";

export interface ISpeciality extends Document {
  id: string;
  name: string;
  image: string;
  professionals: Array<mongoose.Types.ObjectId>;
}

const SpecialitySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true, default: uuidv4 },
  name: { type: String, required: true },
  image: { type: String },
  professionals: [{ type: Schema.Types.ObjectId, ref: "Professional" }],
});

SpecialitySchema.pre<ISpeciality>("save", function (next) {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});

export const Speciality = mongoose.model<ISpeciality>(
  "Speciality",
  SpecialitySchema
);
