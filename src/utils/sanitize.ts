export function sanitize(input: string): string {
  if (!input) return "";
  return input.replace(/[<>]/g, "");
}
