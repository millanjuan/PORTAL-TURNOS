export interface ISpecialityState {
  loading: boolean;
  specialities: [];
}

export interface INewSpeciality {
  name: string;
  image: string;
  professionals: [];
}

export interface IUpdateSpeciality {
  name: string | null;
  image: string | null;
  professionals: [] | null;
}

export interface IDeleteSpeciality {
  specialityId: string;
}

export interface ISpeciality {
  _id: string;
  name: string;
  image: string;
  professionals: string[];
}

export interface SpecialityCardsProps {
  specialities: [];
}

export interface SpecialityCardProps {
  id: string;
  name: string;
  image: string;
}
