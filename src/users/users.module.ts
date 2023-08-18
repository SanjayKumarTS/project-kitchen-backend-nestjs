import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './entities/user.entity';
import { UserRepository } from './repository/users.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailAuthGuard } from 'src/email-auth/email-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UserRepository, UsersService, EmailAuthGuard],
  exports: [UsersService],
})
export class UsersModule {}
