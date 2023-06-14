export interface LoginUser {
  email: string;
  password: string;
}

export interface UserRes {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  countryCode: string;
  phone: string;
  citizenship: string;
}

export interface RegisterUser extends UserRes {
  password: string;
}

export interface Token {
  token: string;
}
