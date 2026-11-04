import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { TaskPriority, TaskStatus } from "../entities/tasks.entity";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    message: string;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority!: TaskPriority;

    @IsOptional()
    @IsEnum(TaskStatus)
    status!: TaskStatus;
}