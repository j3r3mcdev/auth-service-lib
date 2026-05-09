export interface LfiDetector {
  detect(input: string): boolean; // true = LFI détecté
}
