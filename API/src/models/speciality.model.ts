import mongoose, { Schema, Document } from "mongoose";

export interface ISpeciality extends Document {
  name: string;
  image: string;
  professionals: Array<mongoose.Types.ObjectId>;
}

const SpecialitySchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  professionals: [{ type: Schema.Types.ObjectId, ref: "Professional" }],
});

export const Speciality = mongoose.model<ISpeciality>(
  "Speciality",
  SpecialitySchema
);
