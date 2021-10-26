import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { TasklistId } from '../entity/properties/TasklistId';
import { ITasklistRepository } from '../ITasklistRepository';

export class TasklistFinderInteractor {
	constructor(private tasklistRepo: ITasklistRepository) {}

	async run(tasklistId: TasklistId) {
		const tasklist = await this.tasklistRepo.getById(tasklistId);

		if (!tasklist) throw new InvalidException('This tasklist does not exist');

		return tasklist;
	}
}
