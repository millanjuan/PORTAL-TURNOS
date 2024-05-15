export interface IUserState {
  loading: boolean;
}

export interface IUpdate {
  address: string;
  cellphone: string;
  gender: string;
  birthdate: string;
  picture: string | File;
}
