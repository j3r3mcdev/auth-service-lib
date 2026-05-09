export interface MiddlewareRequest {
  method: string; // <— AJOUT
  headers: Record<string, string | undefined>;
  body?: any;
  query?: any;
  params?: any;
  url?: string;
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
