import { PickType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class CreateUserDto extends PickType(User, [
	'username',
	'name',
	'password',
	'email',
	'profile',
	'about',
	'profilePic',
]) {}
