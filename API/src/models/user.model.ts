import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  identity: number;
  typeidentity: string;
  address?: string | null;
  cellphone?: string | null;
  gender?: string | null;
  birthdate?: string;
  picture?: string | null;
  role: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  identity: { type: Number, required: true },
  typeidentity: { type: String, required: true },
  birthdate: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
    required: true,
  },
  address: { type: String },
  cellphone: { type: String },
  gender: { type: String },
  picture: { type: String },
});

export const User = mongoose.model<IUser>("User", UserSchema);
