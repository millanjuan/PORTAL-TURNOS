import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  identity: number;
  typeidentity: string;
  address?: string | null;
  cellphone?: string | null;
  gender?: string | null;
  birthdate: string;
  verified: boolean;
  picture?: string | null;
  role: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true, default: uuidv4 },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  identity: { type: Number, required: true },
  typeidentity: { type: String, required: true },
  address: { type: String },
  cellphone: { type: String },
  gender: { type: String },
  birthdate: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
  picture: { type: String },
  role: { type: String, required: true, default: "patient" },
});

UserSchema.pre<IUser>("save", function (next) {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});

export const User = mongoose.model<IUser>("User", UserSchema);
