export interface SqlInjectionDetector {
  detect(input: string): boolean; // true = SQLi détecté
}
