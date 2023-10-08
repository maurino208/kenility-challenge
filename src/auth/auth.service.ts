import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './schemas/auth-user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SingUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(AuthUser.name) readonly authUserModel: Model<AuthUser>,
    private jwtService: JwtService) {}

    async signUp(singUpDto: SingUpDto): Promise<{ token: string }> {
        const { email, password } = singUpDto;

        const hashPassword = await bcrypt.hash(password, 10);

        const res = await this.authUserModel.create({
            email,
            password: hashPassword
        });
        
        const token = this.jwtService.sign({ id: res._id });

        return { token }
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
    
        const user = await this.authUserModel.findOne({ email });
    
        if (!user) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatched) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const token = this.jwtService.sign({ id: user._id });
    
        return { token };
      }
}
