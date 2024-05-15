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
  userActiveAppointments: Record<string, any>;
  userInactiveAppointments: Record<string, any>;
  monthAppointments: Record<string, any>;
  dateAppointments: Record<string, any>;
  appointmentState: string;
  currentProfessional: string;
  chosenAppointment: string;
  currentSpeciality: string;
}

export interface IAppointmentSchuddle {
  id?: string;
  _id?: string;
  startTime: string;
}

export interface IUserAppointments {
  _id: string;
  date: string;
  year: number;
  month: number;
  startTime: string;
  endTime: string;
  active: boolean;
  user: string;
  professional: {
    _id: string;
    firstname: string;
    lastname: string;
    image: string;
    speciality: {
      _id: string;
      name: string;
      image: string;
    };
  };
}

export interface IUserAppointment {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  professionalFirstname: string;
  professionalLastname: string;
  professionalImage: string;
  speciality: string;
}
