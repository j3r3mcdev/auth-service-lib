import type { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
type AuthRequest = Request & {
    user: {
        sub: string;
        email: string;
    };
};
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    me(req: AuthRequest): Promise<{
        sub: string;
        email: string;
    }>;
    updateUser(req: AuthRequest, dto: UpdateUserDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
        };
        email?: undefined;
    } | {
        message: string;
        email: string;
        user?: undefined;
    }>;
    logout(req: AuthRequest): Promise<{
        message: string;
    }>;
    refresh(req: any, dto: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<string | {
        message: string;
    } | undefined>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
export {};
//# sourceMappingURL=auth.controller.d.ts.map