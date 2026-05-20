export interface XssProvider {
  score(input: string): number; // 0 → 100
  threshold?: number; // seuil facultatif (par défaut 50)
}
