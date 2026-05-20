import { XssProvider } from "../providers/xss-provider";

export class HeuristicXssProvider implements XssProvider {
  constructor(public threshold: number = 50) {}

  score(input: string): number {
    let score = 0;
    const lower = input.toLowerCase();

    // <script>
    if (lower.includes("<script")) score += 50;

    // onerror=, onload=, onclick=, etc.
    if (/on\w+=/i.test(lower)) score += 30;

    // javascript:
    if (lower.includes("javascript:")) score += 40;

    // <img src=x onerror=...>
    if (/<img/i.test(lower)) score += 10;

    // <svg onload=...>
    if (/<svg/i.test(lower)) score += 10;

    // <iframe>
    if (/<iframe/i.test(lower)) score += 20;

    // <object>
    if (/<object/i.test(lower)) score += 20;

    // <a href="javascript:...">
    if (/href\s*=\s*["']javascript:/i.test(lower)) score += 30;

    // Cap score à 100
    return Math.min(score, 100);
  }
}
