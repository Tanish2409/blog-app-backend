import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiUserResponse } from 'src/user/schemas/user.schema';

@Injectable()
export class RolesGaurd implements CanActivate {
	constructor(private reflector: Reflector) {}

	private matchRole(roles: string[], user: ApiUserResponse): boolean {
		if (roles.includes(user.role)) return true;

		return false;
	}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());

		if (!roles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user: ApiUserResponse = request.user;

		return this.matchRole(roles, user);
	}
}
