import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthService {
    private readonly repo;
    private readonly jwt;
    private readonly isE2E;
    constructor(repo: AuthRepository, jwt: JwtService);
    sha256(data: string): string;
    generateTokens(user: {
        id: string;
        email: string;
    }): {
        accessToken: string;
        refreshToken: string;
    };
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
    me(userId: string): Promise<{
        sub: string;
        email: string;
    }>;
    updateUser(userId: string, dto: UpdateUserDto): Promise<{
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
    logout(userId: string): Promise<{
        message: string;
    }>;
    refresh(dto: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<string | undefined>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map