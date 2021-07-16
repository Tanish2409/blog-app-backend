import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as IExpressRequest } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
	ApiBody,
	ApiProperty,
	ApiResponse,
	ApiTags,
	PickType,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiUserResponse, User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';

export class AuthResponse {
	@ApiProperty()
	access_token: string;

	@ApiProperty()
	user: ApiUserResponse;
}

export class ErrorResponse {
	@ApiProperty()
	status: number;

	@ApiProperty()
	message: string;
}

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	/**
	 * @description : Route to Register/Create a new User
	 * @route : /api/auth/register
	 */
	@Post('register')
	@ApiResponse({
		status: 201,
		type: AuthResponse,
	})
	register(
		@Body()
		{ username, email, name, password, about, profilePic }: CreateUserDto
	): Promise<AuthResponse> {
		return this.authService.register({
			username,
			email,
			name,
			password,
			about,
			profilePic,
		});
	}

	/**
	 * @description : Route to Login a registered user
	 * @route : /api/auth/login
	 */
	@ApiBody({
		description: `To Login\n
		Sample Data
		username: string
		password: string
		`,
		type: PickType(User, ['username', 'password']),
	})
	@ApiResponse({
		status: 201,
		type: AuthResponse,
	})
	@ApiResponse({
		status: 401,
		type: ErrorResponse,
		description: "If Username or Password doesn't match",
	})
	@UseGuards(AuthGuard('local'))
	@Post('login')
	login(@Request() req: IExpressRequest): Promise<AuthResponse> {
		return this.authService.login(req.user as ApiUserResponse);
	}
}
