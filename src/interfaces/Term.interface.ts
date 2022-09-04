import { TermLevel } from "types";

interface ITerm {
  _id: string;
  owner: string;
  term: string;
  definition: string;
  imageUrl: string;
  level: TermLevel;
  dateLevelWasChanged?: Date;
  differenceBetweenDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type { ITerm };
