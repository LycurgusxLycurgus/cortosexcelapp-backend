import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req, @Res() res) {
    const { access_token } = await this.authService.login(req.user);
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    res.redirect(`${frontendUrl}/login?token=${access_token}`);
  }
}