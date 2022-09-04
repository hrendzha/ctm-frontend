interface IError extends Error {
  statusCode?: number;
  statusMessage?: string;
}

export type { IError };
