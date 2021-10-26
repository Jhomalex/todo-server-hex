import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { Repository } from '@/app/shared/dataSources/Repository';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { TaskId } from '../core/domain/entity/properties/TaskId';
import { TaskEntity } from '../core/domain/entity/TaskEntity';
import { ITaskRepository } from '../core/domain/ITaskRepository';

export class TaskRepository extends Repository implements ITaskRepository {
	async listByTasklistId(tasklistId: TasklistId): Promise<TaskEntity[]> {
		const result = await this.prisma.task.findMany({
			where: { tasklistId: tasklistId.value },
		});
		return result.map(r => TaskEntity.fromPrimitives(r));
	}

	async delete(task: TaskEntity): Promise<TaskEntity> {
		const result = await this.prisma.task.delete({
			where: {
				id: task.id.value,
			},
		});

		return TaskEntity.fromPrimitives(result);
	}

	async update(task: TaskEntity): Promise<TaskEntity> {
		const result = await this.prisma.task.update({
			where: {
				id: task.id.value,
			},
			data: {
				name: task.name.value,
				description: task.description.value,
				finishedDate: task.finishedDate ? task.finishedDate.value : null,
				isFinished: task.isFinished.value,
				tasklistId: task.tasklistId.value,
				createdAt: task.createdAt.value,
				updatedAt: task.updatedAt.value,
			},
		});

		return TaskEntity.fromPrimitives(result);
	}

	async create(task: TaskEntity): Promise<TaskEntity> {
		const result = await this.prisma.task.create({
			data: {
				id: task.id.value,
				name: task.name.value,
				description: task.description.value,
				finishedDate: task.finishedDate ? task.finishedDate.value : null,
				isFinished: task.isFinished.value,
				tasklistId: task.tasklistId.value,
				createdAt: task.createdAt.value,
				updatedAt: task.updatedAt.value,
			},
		});

		return TaskEntity.fromPrimitives(result);
	}

	async exist(id: TaskId): Promise<boolean> {
		const result = await this.prisma.task.findUnique({
			where: { id: id.value },
		});

		return !!result === true;
	}

	async getById(id: TaskId): Promise<Nullable<TaskEntity>> {
		const result = await this.prisma.task.findUnique({
			where: { id: id.value },
			include: { tasklist: { include: { tasklistMembers: true } } },
		});

		return result ? TaskEntity.fromPrimitives(result) : null;
	}
}
