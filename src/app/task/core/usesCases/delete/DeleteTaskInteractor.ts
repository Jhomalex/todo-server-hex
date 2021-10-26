import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TaskId } from '../../domain/entity/properties/TaskId';
import { TaskEntity } from '../../domain/entity/TaskEntity';
import { TaskFinderInteractor } from '../../domain/interactors/TaskFinderInteractor';
import { ITaskRepository } from '../../domain/ITaskRepository';

export class DeleteTaskInteractor {
	private taskFinder;
	constructor(private taskRepo: ITaskRepository) {
		this.taskFinder = new TaskFinderInteractor(taskRepo);
	}

	async run(params: { taskId: TaskId; userLoggedId: UserId }) {
		let task = await this.taskFinder.run(params.taskId);

		this.guardTask({ task, userId: params.userLoggedId });

		task = await this.taskRepo.delete(task);
		return task;
	}

	private guardTask(params: { task: TaskEntity; userId: UserId }) {
		params.task.isAllowedToBeShowed(params.userId);
	}
}
