import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]): typeof SetMetadata =>
	SetMetadata('roles', roles);
