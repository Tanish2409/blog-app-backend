import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGaurd } from 'src/auth/roles.gaurd';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { ApiUserResponse } from './schemas/user.schema';
import { AuthResponse } from 'src/auth/auth.controller';

@ApiTags('Users')
@Controller('api/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async me(
		@Req()
		req: Request & {
			user: ApiUserResponse;
			headers: Headers & { authorization?: string };
		}
	): Promise<AuthResponse> {
		return {
			access_token: req.headers?.authorization.split('Bearer ')[1],
			user: await this.userService.findOne(req.user.username),
		};
	}

	@Get(':username')
	@ApiBearerAuth()
	// @Roles('user')
	@UseGuards(JwtAuthGuard, RolesGaurd)
	findOne(@Param('username') username: string) {
		return this.userService.findOne(username);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
