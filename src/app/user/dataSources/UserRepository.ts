import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { DataSource } from '@/app/shared/dataSources/DataSource';
import { UserId } from '../core/domain/entity/properties/UserId';
import { UserUsername } from '../core/domain/entity/properties/UserUsername';
import { UserEntity } from '../core/domain/entity/UserEntity';
import { IUserRepository } from '../core/domain/IUserRepository';

export class UserRepository extends DataSource implements IUserRepository {
	async getByUsername(username: UserUsername): Promise<Nullable<UserEntity>> {
		const result = await this.prisma.user.findUnique({
			where: { username: username.value },
		});

		return result ? UserEntity.fromPrimitives(result) : null;
	}

	async delete(user: UserEntity): Promise<UserEntity> {
		const result = await this.prisma.user.delete({
			where: { id: user.id.value },
		});

		return UserEntity.fromPrimitives(result);
	}

	async update(user: UserEntity): Promise<UserEntity> {
		const result = await this.prisma.user.update({
			where: { id: user.id.value },
			data: {
				name: user.name.value,
				username: user.username.value,
				password: user.password.value,
				googleId: user.googleId?.value,
				avatar: user.avatar.value,
				createdAt: user.createdAt.value,
				updatedAt: user.updatedAt.value,
			},
		});

		return UserEntity.fromPrimitives(result);
	}

	async create(user: UserEntity): Promise<UserEntity> {
		const result = await this.prisma.user.create({
			data: {
				id: user.id.value,
				name: user.name.value,
				username: user.username.value,
				password: user.password.value,
				googleId: user.googleId?.value,
				avatar: user.avatar.value,
				createdAt: user.createdAt.value,
				updatedAt: user.updatedAt.value,
			},
		});

		return UserEntity.fromPrimitives(result);
	}

	async exist(id: UserId): Promise<boolean> {
		const result = await this.prisma.user.findUnique({
			where: { id: id.value },
		});

		return !!result === true;
	}

	async getById(id: UserId): Promise<Nullable<UserEntity>> {
		const result = await this.prisma.user.findUnique({
			where: { id: id.value },
		});

		return result ? UserEntity.fromPrimitives(result) : null;
	}
}
