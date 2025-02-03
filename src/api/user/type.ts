export interface ISearchUserReq {
  login: string;
}

export interface IChangeUserReq {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ISearchUserRes {
  avatar: string | null;
  display_name: string;
  first_name: string;
  id: number;
  login: string;
  second_name: string;
}

export interface IChangePasswordRes {
  oldPassword: string;
  newPassword: string;
}
