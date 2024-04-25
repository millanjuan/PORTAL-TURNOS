import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";
import { IProfessional } from "./professional.model";

export interface IAppointment extends Document {
  id: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  active: boolean;
  user: IUser["_id"];
  professional: IProfessional["_id"];
}

const AppointmentSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true, default: uuidv4 },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  active: { type: Boolean, required: true, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User", requiered: false },
  professional: {
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
});

AppointmentSchema.pre<IAppointment>("save", function (next) {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
