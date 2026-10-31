import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('tasks')                     // lowercase table name is better
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  message!: string;

  // Many tasks belong to one user
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',             // optional but recommended
  })
  sender!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}