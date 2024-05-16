export interface IProfessional {
  nameFilter?: string;
  specialityId?: string;
}

export interface IProfessionalState {
  loading: boolean;
  professionals: Array<any>;
  total: number | null;
}

export interface IProfessionalCardProps {
  id: string;
  firstname: string;
  lastname: string;
  image: string;
}

export interface IProfessionalProps {
  professionals: [];
}

export interface IProfessional2 {
  _id: string;
  firstname: string;
  lastname: string;
  image: string;
}

export interface IRestoreState {
  id: string;
  loading: boolean;
  status: string;
}
