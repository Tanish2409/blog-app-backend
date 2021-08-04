import { PickType } from '@nestjs/swagger';
import { Category } from '../schemas/category.schema';
// import { User } from '../schemas/user.schema';

export class CreateCategoryDto extends PickType(Category, ['name']) {}
