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

export type UserType = Partial<UserModelType>;

export interface LoginType {
  username: string;
  password: string;
}

export interface ILoginRespone {
  token: string;
}
