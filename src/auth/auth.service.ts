import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    private generateToken(user: User){
        const payload = { sub: user.id, username: user.username}

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async signUp(singUpDto: SignUpDto){
        const { email, username, password } = singUpDto;
        const existingUser = await this.userRepo.findOneBy({ email})
        if(existingUser){
            throw new ConflictException("email already exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = this.userRepo.create({
            username,
            hashedPassword
        })
        await this.userRepo.save(user)
        return this.generateToken(user)
    }
    async singIn(singInDto: SignInDto){
        const { username, password } = singInDto;
        const user = await this.userRepo.findOneBy({username})
        if (!user){
            throw new NotFoundException("user not found")
        }
        const isPassValid = await bcrypt.compare(password, user.hashedPassword)
        if(!isPassValid){
            throw new UnauthorizedException("invalid credentials")
        }
        return this.generateToken(user)
    }

}
