export interface IMonthlyAppointments {
  month: number;
  year: number;
  professionalId: string;
}

export interface ISchuddleAppointment {
  userId?: string;
  appointmentId: string;
}
