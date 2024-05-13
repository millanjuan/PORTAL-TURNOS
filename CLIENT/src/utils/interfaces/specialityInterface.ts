export interface ISpecialityState {
  loading: boolean;
  specialities: [];
}

export interface INewSpeciality {
  name: string;
  image: string;
  professionals: [];
  token: string;
}

export interface IUpdateSpeciality {
  name: string | null;
  image: string | null;
  professionals: [] | null;
}

export interface IDeleteSpeciality {
  specialityId: string;
  token: string;
}

export interface ISpeciality {
  name: string;
  image: string;
  professionals: string[];
}
