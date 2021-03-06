import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiUserResponse, User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	sanitize(userModel: UserDocument): ApiUserResponse {
		const userCopy: UserDocument = JSON.parse(JSON.stringify(userModel));
		delete userCopy.password;
		delete userCopy.updatedAt;

		return userCopy;
	}

	async create(createUserDto: CreateUserDto): Promise<UserDocument> {
		// find user with the mail id being used to register
		const userWithEmail = await this.userModel.findOne({
			email: createUserDto.email,
		});

		// if user found with same email, send an error
		if (userWithEmail) {
			throw new BadRequestException({
				status: HttpStatus.BAD_REQUEST,
				message: 'Email Already in use.',
			});
		}

		const userWithUsername = await this.userModel.findOne({
			username: createUserDto.username,
		});

		// if user found with same username, send an error
		if (userWithUsername) {
			throw new BadRequestException({
				status: HttpStatus.BAD_REQUEST,
				message: 'Username already taken.',
			});
		}

		// if no user found
		// Hash Password
		const hashedPassword = await argon.hash(createUserDto.password);

		// Save the user with new details
		const newUser = new this.userModel({
			...createUserDto,
			password: hashedPassword,
		});
		await newUser.save();

		// Return user
		return newUser;
	}

	async findOne(username: string): Promise<ApiUserResponse> {
		const user: UserDocument = await this.userModel.findOne({ username });

		// return `This action returns a #${id} user`;
		return this.sanitize(user);
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number): string {
		return `This action removes a #${id} user`;
	}
}
