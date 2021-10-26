import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TaskDescription } from '../../domain/entity/properties/TaskDescription';
import { TaskFinishedDate } from '../../domain/entity/properties/TaskFinishedDate';
import { TaskId } from '../../domain/entity/properties/TaskId';
import { TaskIsFinished } from '../../domain/entity/properties/TaskIsFinished';
import { TaskName } from '../../domain/entity/properties/TaskName';
import { TaskEntity } from '../../domain/entity/TaskEntity';
import { TaskFinderInteractor } from '../../domain/interactors/TaskFinderInteractor';
import { ITaskRepository } from '../../domain/ITaskRepository';

export class UpdateTaskInteractor {
	private taskFinder;
	constructor(private taskRepo: ITaskRepository) {
		this.taskFinder = new TaskFinderInteractor(taskRepo);
	}

	async run(params: {
		taskId: TaskId;
		name: TaskName;
		description: TaskDescription;
		finishedDate?: TaskFinishedDate;
		isFinished: TaskIsFinished;
		userLoggedId: UserId;
	}) {
		let task = await this.taskFinder.run(params.taskId);
		task.name = params.name;
		task.description = params.description;
		task.finishedDate = params.finishedDate ? params.finishedDate : null;
		task.isFinished = params.isFinished;

		this.guardTask({ task, userId: params.userLoggedId });

		task = await this.taskRepo.update(task);
		return task;
	}

	private guardTask(params: { task: TaskEntity; userId: UserId }) {
		params.task.isAllowedToBeShowed(params.userId);
	}
}
