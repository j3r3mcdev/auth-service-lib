export interface AsnProvider {
  lookup(ip: string): number | null; // retourne un numéro d'ASN (ex: 15169 pour Google)
}
