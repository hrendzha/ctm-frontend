import { Subscription } from "types";

interface IUser {
  token: string;
  name: string;
  email: string;
  subscription: Subscription;
}

export type { IUser };
