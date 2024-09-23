import { ITerm } from "interfaces";

type TermForUpdate = Partial<Pick<ITerm, "term" | "definition" | "level" | "imageUrl">>;

export type { TermForUpdate };
