export interface IUser {
  id: number | string;
  fristname: string;
  lastname: string,
  email: string,
  phone: string,
  fullname: string,
  fristChar: string
}

export interface IRegisterForm {
    email: string,
    password: string
    fristname: string,
    lastname: string,
}