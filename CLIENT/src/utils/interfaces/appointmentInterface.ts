export interface IAppointment {
  appointmentId: string;
}

export interface IMonthAppointments {
  year: number;
  month: number;
  professionalId: string;
}

export interface IDateAppointments {
  date: string;
  professionalId: string;
}

export interface IAppointmentState {
  loading: boolean;
  userAppointments: Record<string, any>;
  monthAppointments: Record<string, any>;
  dateAppointments: Record<string, any>;
  appointmentState: string;
  currentProfessional: string;
  chosenAppointment: string;
}

export interface IAppointmentSchuddle {
  id?: string;
  _id?: string;
  startTime: string;
}
