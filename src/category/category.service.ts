import {
	BadRequestException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
	) {}

	async create(
		createCategoryDto: CreateCategoryDto
	): Promise<CategoryDocument> {
		const slug = slugify(createCategoryDto.name).toLowerCase();

		const category = await this.categoryModel.findOne({ slug });

		if (category) {
			throw new BadRequestException({
				status: HttpStatus.BAD_REQUEST,
				message: 'Category Already Exists',
			});
		}

		const newCategory = new this.categoryModel({
			...createCategoryDto,
			slug,
			createdAt: Date.now(),
		});

		try {
			await newCategory.save();

			return newCategory;
		} catch (error) {
			throw new InternalServerErrorException({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				message:
					'Internal Server Error. Could not create category. Please try again.',
			});
		}
	}
}
