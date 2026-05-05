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
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthController = void 0;
const common_1 = require('@nestjs/common');
const auth_service_1 = require('./auth.service');
const register_dto_1 = require('./dto/register.dto');
const login_dto_1 = require('./dto/login.dto');
const refresh_dto_1 = require('./dto/refresh.dto');
const update_user_dto_1 = require('./dto/update-user.dto');
const forgot_password_dto_1 = require('./dto/forgot-password.dto');
const reset_password_dto_1 = require('./dto/reset-password.dto');
const jwt_guard_1 = require('./guards/jwt.guard');
let AuthController = class AuthController {
  authService;
  constructor(authService) {
    this.authService = authService;
  }
  async register(dto) {
    return this.authService.register(dto);
  }
  async login(dto) {
    return this.authService.login(dto);
  }
  async me(req) {
    return this.authService.me(req.user.sub);
  }
  async updateUser(req, dto) {
    return this.authService.updateUser(req.user.sub, dto);
  }
  async logout(req) {
    return this.authService.logout(req.user.sub);
  }
  async refresh(req, dto) {
    return this.authService.refresh(dto);
  }
  async forgotPassword(dto) {
    const token = await this.authService.forgotPassword(dto);
    if (process.env.NODE_ENV === 'test:e2e') {
      return token; // ✔ renvoie la string brute
    }
    return { message: 'Reset email sent' };
  }
  async resetPassword(dto) {
    return this.authService.resetPassword(dto);
  }
};
exports.AuthController = AuthController;
__decorate(
  [
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [register_dto_1.RegisterDto]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'register',
  null,
);
__decorate(
  [
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [login_dto_1.LoginDto]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'login',
  null,
);
__decorate(
  [
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'me',
  null,
);
__decorate(
  [
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('update'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, update_user_dto_1.UpdateUserDto]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'updateUser',
  null,
);
__decorate(
  [
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'logout',
  null,
);
__decorate(
  [
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, refresh_dto_1.RefreshDto]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'refresh',
  null,
);
__decorate(
  [
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'forgotPassword',
  null,
);
__decorate(
  [
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [reset_password_dto_1.ResetPasswordDto]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'resetPassword',
  null,
);
exports.AuthController = AuthController = __decorate(
  [
    (0, common_1.Controller)('auth'),
    __metadata('design:paramtypes', [auth_service_1.AuthService]),
  ],
  AuthController,
);
