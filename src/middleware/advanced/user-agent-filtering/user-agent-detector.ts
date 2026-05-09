export interface UserAgentDetector {
  detect(ua: string): boolean; // true = UA interdit
}
