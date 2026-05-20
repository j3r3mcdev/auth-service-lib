import { XssProvider } from "./xss-provider";

export class MlXssProvider implements XssProvider {
  constructor(
    public threshold: number = 50,
    private modelPredictSync: (input: string) => number,
  ) {}

  score(input: string): number {
    try {
      const result = this.modelPredictSync(input);

      // On s'assure que le score est entre 0 et 100
      return Math.max(0, Math.min(100, result));
    } catch (err) {
      // En cas d'erreur du modèle → score neutre
      return 0;
    }
  }
}
