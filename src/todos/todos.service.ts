import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodosEntity } from './todos.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { CreateTodoProps } from './todos.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodosEntity)
    private todosRepository: Repository<TodosEntity>,
  ) {}

  create(props: CreateTodoProps & { userId: string }): Promise<InsertResult> {
    return this.todosRepository.insert(props);
  }

  delete(todoId: string): Promise<DeleteResult> {
    return this.todosRepository.delete({ todoId });
  }

  findByIdOrFail(todoId: string): Promise<TodosEntity> {
    return this.todosRepository.findOneOrFail({
      where: { todoId },
      order: { priority: 'DESC' },
    });
  }

  findByUserId(userId: string): Promise<TodosEntity[]> {
    return this.todosRepository.find({
      where: { userId },
      order: { priority: 'DESC' },
    });
  }
}
