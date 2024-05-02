import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";
import { IProfessional } from "./professional.model";

export interface IAppointment extends Document {
  date: Date;
  year: number;
  month: number;
  startTime: Date;
  endTime: Date;
  active: boolean;
  user: IUser["_id"];
  professional: IProfessional["_id"];
}

const AppointmentSchema: Schema = new Schema({
  date: { type: Date, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  active: { type: Boolean, required: true, default: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    requiered: false,
    default: null,
  },
  professional: {
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
});

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
