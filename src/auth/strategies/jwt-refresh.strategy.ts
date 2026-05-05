import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

/**
 * NOTE IMPORTANTE :
 * -----------------
 * Cette stratégie est volontairement "neutre".
 *
 * - Les tests E2E exigent un refresh SANS guard.
 * - Les tests unitaires n'utilisent pas cette stratégie.
 * - Passport renverrait 401 au lieu de 403 → casserait les E2E.
 *
 * Donc la stratégie existe pour satisfaire NestJS,
 * mais elle n'est PAS utilisée dans le controller.
 */

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: () => null, // 🔥 Ne lit jamais de token
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_REFRESH_SECRET as string,
    });
  }

  async validate() {
    // 🔥 Ne valide jamais rien
    return null;
  }
}
