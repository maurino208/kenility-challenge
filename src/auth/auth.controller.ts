import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('/singup')
    singUp(@Body() singUpDto: SingUpDto): Promise<{ token: string }> {
        return this.authService.signUp(singUpDto);
    }

    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }
}
