export interface UserAgentDetector {
  isMalicious(ua: string): boolean;
}
