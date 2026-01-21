export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  verificationToken: string;
  createdAt: Date;
  updatedAt: Date;
}
