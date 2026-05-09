export interface XssDetector {
  detect(input: string): boolean; // true = XSS détecté
}
