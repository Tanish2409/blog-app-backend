import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGaurd } from 'src/auth/roles.gaurd';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDocument } from './schemas/category.schema';

@ApiTags('Category')
@Controller('api/category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post('/')
	@ApiBearerAuth()
	@Roles('admin')
	@UseGuards(JwtAuthGuard, RolesGaurd)
	create(@Body() { name }: CreateCategoryDto): Promise<CategoryDocument> {
		return this.categoryService.create({ name });
	}
}
