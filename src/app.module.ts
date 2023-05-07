import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        username: 'root',
        password: 'damianek45',
        database: 'todos',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),

    AuthenticationModule,

    TodosModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/todos');
  }
}
