'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.JwtRefreshStrategy = void 0;
const common_1 = require('@nestjs/common');
const passport_1 = require('@nestjs/passport');
const passport_jwt_1 = require('passport-jwt');
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
let JwtRefreshStrategy = class JwtRefreshStrategy extends (0,
passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: () => null, // 🔥 Ne lit jamais de token
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }
  async validate() {
    // 🔥 Ne valide jamais rien
    return null;
  }
};
exports.JwtRefreshStrategy = JwtRefreshStrategy;
exports.JwtRefreshStrategy = JwtRefreshStrategy = __decorate(
  [(0, common_1.Injectable)(), __metadata('design:paramtypes', [])],
  JwtRefreshStrategy,
);
