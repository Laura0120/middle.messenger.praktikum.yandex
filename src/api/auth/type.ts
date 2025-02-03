export interface ISignUpReq {
  first_name: string;
  second_name?: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ISignInReq {
  login: string;
  password: string;
}

export interface IUserRes {
  avatar: string;
  display_name: null;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}

export interface ILastMessage {
  content: string;
  id: number;
  time: string;
  user: IUserRes;
}
