import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: "3ST3 3s 3l m3ns4j3 s3cr3t0 y fr4s3",
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
