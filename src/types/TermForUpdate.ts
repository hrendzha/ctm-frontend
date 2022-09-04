import { ITerm } from "interfaces";

type TermForUpdate = Pick<ITerm, "_id" | "term" | "definition">;

export type { TermForUpdate };
