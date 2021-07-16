import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
	/**
	 * Username field
	 */
	@ApiProperty()
	@IsNotEmpty()
	@Prop({
		required: true,
		trim: true,
		unique: true,
		index: true,
		lowercase: true,
		maxlength: 32,
		type: mongoose.Schema.Types.String,
	})
	username: string;

	/**
	 * Name field
	 */
	@ApiProperty()
	@IsNotEmpty()
	@Prop({
		type: mongoose.Schema.Types.String,
		trim: true,
		required: true,
		maxlength: 32,
	})
	name: string;

	/**
	 * Email Field
	 */
	@ApiProperty()
	@IsEmail()
	@Prop({
		type: mongoose.Schema.Types.String,
		trim: true,
		required: true,
		unique: true,
		lowercase: true,
	})
	email: string;

	/**
	 * Password
	 */
	@ApiProperty()
	@IsNotEmpty()
	@Prop({
		type: mongoose.Schema.Types.String,
		required: true,
	})
	password: string;

	/**
	 * Profile
	 */
	// @ApiProperty()
	// @IsNotEmpty()
	@Prop({
		type: mongoose.Schema.Types.String,
		required: false,
	})
	profile: string;

	/**
	 * About
	 */
	@ApiPropertyOptional()
	@IsOptional()
	@IsNotEmpty()
	@Prop({
		type: mongoose.Schema.Types.String,
	})
	about?: string;

	/**
	 * Role
	 */
	@Prop({
		type: mongoose.Schema.Types.String,
		trim: true,
		enum: ['admin', 'user'],
		default: 'user',
	})
	role: 'admin' | 'user';

	/**
	 * Profile Pic
	 */
	@ApiPropertyOptional()
	@IsOptional()
	@IsNotEmpty()
	@Prop({
		type: mongoose.Schema.Types.String,
		trim: true,
	})
	profilePic?: string;

	/**
	 * Reset Password Token
	 */
	@Prop({
		type: mongoose.Schema.Types.String,
	})
	resetToken?: string;

	/**
	 * CreatedAt TimeStamp
	 */
	@ApiPropertyOptional()
	@Prop({
		type: mongoose.Schema.Types.Date,
		default: Date.now(),
	})
	createdAt: string;

	/**
	 * UpdatedAt TimeStamp
	 */
	@Prop({
		type: mongoose.Schema.Types.Date,
		default: Date.now(),
	})
	updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type ApiUserResponse = Omit<
	Pick<UserDocument, keyof User | '__v' | '_id'>,
	'password' | 'updatedAt'
>;
