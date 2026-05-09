export interface PathTraversalDetector {
  detect(input: string): boolean; // true = path traversal détecté
}
