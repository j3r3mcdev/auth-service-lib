export interface RfiDetector {
  detect(input: string): boolean; // true = RFI détecté
}
