export type User = {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string;
  image: string;
  email: string;
  gender: number;
  age: number;
  self_introduction: string;
  admin: boolean;
};