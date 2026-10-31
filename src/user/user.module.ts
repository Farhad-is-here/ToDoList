import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TasksService } from '../tasks/tasks.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [TaskController],
    providers:[TasksService],
    exports: [TasksService],
})
export class UserModule {}
