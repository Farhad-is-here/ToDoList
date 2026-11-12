import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    async SignUp(@Body() signUpDto: SignUpDto){
        return this.authService.signUp(signUpDto)
    }

    @Post('/signIn')
    async SinIn(@Body() signInDto: SignInDto){
        return this.authService.singIn(signInDto)
    }
    
}
