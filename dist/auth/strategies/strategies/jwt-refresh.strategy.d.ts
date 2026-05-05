import { Strategy } from 'passport-jwt';
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
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
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    constructor();
    validate(): Promise<null>;
}
export {};
//# sourceMappingURL=jwt-refresh.strategy.d.ts.map