import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class TodosEntity {
  @PrimaryGeneratedColumn('uuid')
  todoId: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'uuid', nullable: false, select: false })
  userId: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  tags: string;

  @Column({ type: 'boolean', default: false })
  pinned: boolean;

  @Column({ type: 'tinyint', nullable: true, default: 1, select: false })
  priority: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
