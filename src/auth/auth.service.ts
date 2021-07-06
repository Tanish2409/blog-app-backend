import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon from 'argon2';
import {
	ApiUserResponse,
	User,
	UserDocument,
} from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthResponse } from './auth.controller';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface IPayload {
	userId: string;
	username: string;
}

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		@InjectModel(User.name) private userModel: Model<UserDocument>
	) {}

	async validateUser(username: string, pass: string): Promise<ApiUserResponse> {
		const user = await this.userModel.findOne({ username });

		if (user) {
			const isPassMatch = await argon.verify(user.password, pass);

			if (isPassMatch) {
				const userCopy: UserDocument = JSON.parse(JSON.stringify(user));
				delete userCopy.password;
				delete userCopy.role;
				delete userCopy.updatedAt;

				return userCopy as ApiUserResponse;
			}
		}

		return null;
	}

	async register(createUserDTO: CreateUserDto): Promise<AuthResponse> {
		const user = await this.userService.create(createUserDTO);

		const payload: IPayload = { username: user.username, userId: user._id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async login(user: ApiUserResponse): Promise<AuthResponse> {
		const payload: IPayload = { username: user.username, userId: user._id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
