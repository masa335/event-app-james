import { atom } from 'recoil';

type authUser = {
  admin: boolean;
  age: number;
  allow_password_change: boolean;
  email: string;
  gender: number;
  id: number;
  image: {
    url: string;
  }
  name: string;
  provider: string;
  self_introduction: string;
  uid: string;
};

export type Auth = {
  loading: boolean
  isSignedIn: boolean;
  currentUser?: authUser | undefined;
};

//グルーバルステートの初期値
const initialAuth: Auth = {
  loading: false,
  isSignedIn: false,
  currentUser: undefined
};

export const authState = atom({
  key: 'auth',
  default: initialAuth,
});