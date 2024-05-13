export interface IAppointment {
  appointmentId: string;
  token: string;
}

export interface IMonthAppointments {
  year: string;
  month: string;
  professionalId: string;
  token: string;
}

export interface IDateAppointments {
  date: Date;
  professionalId: string;
  token: string;
}

export interface IAppointmentState {
  loading: boolean;
  userAppointments: Record<string, any>;
  monthAppointments: Record<string, any>;
  dateAppointments: Record<string, any>;
  appointmentState: string;
}
