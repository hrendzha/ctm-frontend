import { ITerm } from "interfaces";

type TermForUpdate = Partial<Pick<ITerm, "term" | "definition" | "imageUrl">>;

export type { TermForUpdate };
