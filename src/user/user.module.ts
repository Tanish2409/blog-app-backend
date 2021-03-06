import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

const mongooseModule = MongooseModule.forFeature([
	{
		name: User.name,
		schema: UserSchema,
	},
]);

@Module({
	imports: [mongooseModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService, mongooseModule],
})
export class UserModule {}
