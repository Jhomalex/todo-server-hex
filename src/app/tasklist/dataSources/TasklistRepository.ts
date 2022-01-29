import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { Repository } from '@/app/shared/dataSources/Repository';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TasklistId } from '../core/domain/entity/properties/TasklistId';
import { TasklistEntity } from '../core/domain/entity/TasklistEntity';
import { ITasklistRepository } from '../core/domain/ITasklistRepository';

export class TasklistRepository
	extends Repository
	implements ITasklistRepository
{
	async listByUserId(userId: UserId): Promise<TasklistEntity[]> {
		let result = await this.prisma.tasklist.findMany({
			where: { tasklistMembers: { some: { userId: userId.value } } },
			include: {
				tasklistMembers: {
					include: { user: true },
				},
			},
		});
		result = result.filter(r => r.tasklistMembers.length > 0);
		return result.map(r => TasklistEntity.fromPrimitives(r));
	}

	async delete(tasklist: TasklistEntity): Promise<TasklistEntity> {
		const result = await this.prisma.tasklist.delete({
			where: { id: tasklist.id.value },
		});

		return TasklistEntity.fromPrimitives(result);
	}

	async update(tasklist: TasklistEntity): Promise<TasklistEntity> {
		const result = await this.prisma.tasklist.update({
			where: { id: tasklist.id.value },
			data: {
				name: tasklist.name.value,
				isPublic: tasklist.isPublic.value,
				createdAt: tasklist.createdAt.value,
				updatedAt: tasklist.updatedAt.value,
			},
		});

		return TasklistEntity.fromPrimitives(result);
	}

	async create(tasklist: TasklistEntity): Promise<TasklistEntity> {
		const result = await this.prisma.tasklist.create({
			data: {
				id: tasklist.id.value,
				name: tasklist.name.value,
				isPublic: tasklist.isPublic.value,
				createdAt: tasklist.createdAt.value,
				updatedAt: tasklist.updatedAt.value,
			},
		});

		return TasklistEntity.fromPrimitives(result);
	}

	async exist(id: TasklistId): Promise<boolean> {
		const result = await this.prisma.tasklist.findUnique({
			where: { id: id.value },
		});

		return !!result === true;
	}

	async getById(id: TasklistId): Promise<Nullable<TasklistEntity>> {
		console.log(id);
		const result = await this.prisma.tasklist.findUnique({
			where: { id: id.value },
			include: {
				tasklistMembers: {
					include: { user: true },
				},
			},
		});

		return result ? TasklistEntity.fromPrimitives(result) : null;
	}
}
