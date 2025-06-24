export interface UserModelType {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  username: string;
  lastLoggedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserType = Pick<
  UserModelType,
  "email" | "id" | "username" | "name" | "role"
>;

export interface LoginType {
  username: string;
  password: string;
}

export interface ILoginRespone {
  token: string;
}

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  username: string;
};

export type TLoginUserJWT = { iat: number; exp: number } & Pick<
  UserModelType,
  "id" | "email" | "name" | "username" | "role"
>;

export type TGetUser = {
  user: UserModelType;
  message: string;
};
