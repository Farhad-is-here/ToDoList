import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Task])],
    controllers:[TaskController],
    providers:[TasksService],
    exports: [TasksService],
})
export class TasksModule {}
