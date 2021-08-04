import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schemas/category.schema';

const mongooseModule = MongooseModule.forFeature([
	{
		name: Category.name,
		schema: CategorySchema,
	},
]);

@Module({
	imports: [mongooseModule],
	controllers: [CategoryController],
	providers: [CategoryService],
})
export class CategoryModule {}
