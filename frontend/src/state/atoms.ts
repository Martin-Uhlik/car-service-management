import { atom } from 'recoil';
import { LoggedUser } from "../models/types";

export const loginStatusAtom = atom<LoggedUser>({    
  key: 'roleAtom',
  default: {
    token: '',
    role: 'none',
    name: '',
    surname: '',
    phone: '',
    email: '',
  }
});