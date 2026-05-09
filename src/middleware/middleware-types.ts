export interface MiddlewareRequest {
  ip?: string;
  url: string; // <-- AJOUT IMPORTANT
  headers: Record<string, string | undefined>;

  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
}

export interface MiddlewareResponse {
  status: (code: number) => MiddlewareResponse;
  json: (body: any) => void;
}

export type MiddlewareNext = () => void;

export type MiddlewareFunction = (
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext,
) => void;
