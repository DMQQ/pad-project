import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { User } from 'src/decorators/User';
import { CreateTodoProps } from './todos.dto';

@Controller('/todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post('/')
  async createTodo(@User() userId: string, @Body() input: CreateTodoProps) {
    const insertResult = await this.todosService.create({ ...input, userId });

    return insertResult.generatedMaps[0];
  }

  @Delete('/:todoId')
  async deleteTodo(@Param('todoId') todoId: string) {
    const deleteResult = await this.todosService.delete(todoId);

    return {
      statusCode: deleteResult.affected > 0 ? 200 : 400,
      message: deleteResult.affected > 0 ? 'Todo removed' : 'Failed',
    };
  }

  @Get('/')
  async findTodos(@User() userId: string) {
    const todos = await this.todosService.findByUserId(userId);

    console.log(typeof userId, userId);

    return todos;
  }

  @Get('/:todoId')
  async findTodoById(@Param('todoId') todoId: string) {
    try {
      const todo = await this.todosService.findByIdOrFail(todoId);

      return todo;
    } catch (error) {
      throw new NotFoundException('Todo not found');
    }
  }
}
