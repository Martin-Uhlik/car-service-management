export type Role = 'customer' | 'technician' | 'none';

export interface LoggedUser {
  role: Role;
  token: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
}