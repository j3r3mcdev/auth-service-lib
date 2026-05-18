export interface UserAgentDetector {
  detect(userAgent: string | undefined): boolean;
}
