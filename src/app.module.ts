import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';

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
  ],
})
export class AppModule {}
