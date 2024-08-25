import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TopicsModule } from './topics/topics.module';
import { PrismaService } from './prisma.service';
import { CommentsModule } from './comments/comments.module'; // Added this line

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    TopicsModule,
    CommentsModule, // Added this line
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}