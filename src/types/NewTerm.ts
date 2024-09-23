import { ITerm } from "interfaces";

type NewTerm = Pick<ITerm, "term" | "definition" | "level">;

export type { NewTerm };
