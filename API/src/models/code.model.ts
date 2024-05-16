import mongoose, { Schema, Document } from "mongoose";

export interface IVerificationCode extends Document {
  code: string;
  expirationDate: Date;
  user: string;
  active: boolean;
}

const VerificationCodeSchema: Schema = new Schema({
  code: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  active: { type: Boolean, required: true, default: true },
});

export const VerificationCode = mongoose.model<IVerificationCode>(
  "VerificationCode",
  VerificationCodeSchema
);
