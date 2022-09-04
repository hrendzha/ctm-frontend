import { ITerm } from "interfaces";

type NewTerm = Pick<ITerm, "term" | "definition">;

export type { NewTerm };
