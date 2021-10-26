import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { DataSource } from '@/app/shared/dataSources/DataSource';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TasklistMemberEntity } from '../core/domain/entity/TasklistMemberEntity';
import { ITasklistMemberRepository } from '../core/domain/ITasklistMemberRepository';

export class TasklistMemberRepository
	extends DataSource
	implements ITasklistMemberRepository
{
	async listByTasklistId(
		tasklistId: TasklistId
	): Promise<TasklistMemberEntity[]> {
		const result = await this.prisma.tasklistMember.findMany({
			where: { tasklistId: tasklistId.value },
		});

		return result.map(r => TasklistMemberEntity.fromPrimitives(r));
	}

	async delete(
		tasklistMember: TasklistMemberEntity
	): Promise<TasklistMemberEntity> {
		const result = await this.prisma.tasklistMember.delete({
			where: {
				userId_tasklistId: {
					userId: tasklistMember.userId.value,
					tasklistId: tasklistMember.tasklistId.value,
				},
			},
		});

		return TasklistMemberEntity.fromPrimitives(result);
	}

	async update(
		tasklistMember: TasklistMemberEntity
	): Promise<TasklistMemberEntity> {
		const result = await this.prisma.tasklistMember.update({
			where: {
				userId_tasklistId: {
					userId: tasklistMember.userId.value,
					tasklistId: tasklistMember.tasklistId.value,
				},
			},
			data: {
				userId: tasklistMember.userId.value,
				tasklistId: tasklistMember.tasklistId.value,
				createdAt: tasklistMember.createdAt.value,
				updatedAt: tasklistMember.updatedAt.value,
			},
		});

		return TasklistMemberEntity.fromPrimitives(result);
	}

	async create(
		tasklistMember: TasklistMemberEntity
	): Promise<TasklistMemberEntity> {
		const result = await this.prisma.tasklistMember.create({
			data: {
				userId: tasklistMember.userId.value,
				tasklistId: tasklistMember.tasklistId.value,
				createdAt: tasklistMember.createdAt.value,
				updatedAt: tasklistMember.updatedAt.value,
			},
		});

		return TasklistMemberEntity.fromPrimitives(result);
	}

	async exist(userId: UserId, tasklistId: TasklistId): Promise<boolean> {
		const result = await this.prisma.tasklistMember.findUnique({
			where: {
				userId_tasklistId: {
					userId: userId.value,
					tasklistId: tasklistId.value,
				},
			},
		});

		return !!result === true;
	}

	async getById(params: {
		userId: UserId;
		tasklistId: TasklistId;
	}): Promise<Nullable<TasklistMemberEntity>> {
		const result = await this.prisma.tasklistMember.findUnique({
			where: {
				userId_tasklistId: {
					userId: params.userId.value,
					tasklistId: params.tasklistId.value,
				},
			},
		});

		return result ? TasklistMemberEntity.fromPrimitives(result) : null;
	}
}
