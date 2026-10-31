import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';
import { User } from '../user/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private taskRepo: Repository<Task>
){}
    create(createTaskDto: CreateTaskDto){
        const task = this.taskRepo.create(createTaskDto);
        return this.taskRepo.save(task)}

    findAll(){
        return this.taskRepo.find()
    }

    async findOne(id: string){
        const task = await this.taskRepo.findBy({id})
        if(!task){
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
        return task
    }

    async remove(id: string){
        const task = await this.findOne(id)
        await this.taskRepo.remove(task)

    }
    async update(id: string, updateTask: UpdateTaskDto){
        const task = await this.findOne(id)
        Object.assign(task, updateTask)
        return this.taskRepo.save(task)
    }
}
