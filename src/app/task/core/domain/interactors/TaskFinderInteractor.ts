import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { TaskId } from '../../domain/entity/properties/TaskId';
import { ITaskRepository } from '../../domain/ITaskRepository';

export class TaskFinderInteractor {
	constructor(private taskRepo: ITaskRepository) {}

	async run(id: TaskId) {
		const task = await this.taskRepo.getById(id);

		if (!task) throw new InvalidException('This task does not exist');

		return task;
	}
}
