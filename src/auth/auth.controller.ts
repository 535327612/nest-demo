import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@/commom/decorators';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
