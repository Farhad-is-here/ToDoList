import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/tasks.entity';

@Entity('users')                     // usually plural
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({unique: true})
  email!: string

  @Column({ unique: true })
  username!: string;

  @Column()
  hashedPassword!: string;

  // One user has many tasks
  @OneToMany(() => Task, (task) => task.sender)
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}