export interface User {
  id: string;
  email: string;
  name: string;
  mission: string;
  admin: boolean;
}

export interface LoginResponse {
  id: string;
  email: string;
  name: string;
  mission: string;
  admin: boolean;
  token: string;
}