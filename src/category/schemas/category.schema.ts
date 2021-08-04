import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export type CategoryDocument = Category & mongoose.Document;

@Schema()
export class Category {
	/**
	 * Name of the category
	 */
	@ApiProperty()
	@IsNotEmpty()
	@Prop({
		required: true,
		trim: true,
		max: 32,
		type: mongoose.Schema.Types.String,
	})
	name: string;

	/**
	 * Category Slug
	 */
	@Prop({
		type: mongoose.Schema.Types.String,
		trim: true,
		unique: true,
		index: true,
	})
	slug: string;

	/**
	 * CreatedAt TimeStamp
	 */
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

export const CategorySchema = SchemaFactory.createForClass(Category);
