export interface MiddlewareRequest {
  method: string;
  url?: string;
  originalUrl?: string;
  path?: string;
  ip?: string;
  headers: Record<string, string | undefined>;
  body?: any;
  query?: any;
  params?: any;
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
