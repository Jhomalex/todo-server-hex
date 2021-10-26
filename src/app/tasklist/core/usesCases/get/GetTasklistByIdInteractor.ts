import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TasklistId } from '../../domain/entity/properties/TasklistId';
import { TasklistEntity } from '../../domain/entity/TasklistEntity';
import { TasklistFinderInteractor } from '../../domain/interactors/TasklistFinderInteractor';
import { ITasklistRepository } from '../../domain/ITasklistRepository';

export class GetTasklistByIdInteractor {
	private tasklistFinder;
	constructor(private tasklistRepo: ITasklistRepository) {
		this.tasklistFinder = new TasklistFinderInteractor(tasklistRepo);
	}

	async run(params: { tasklistId: TasklistId; userLoggedId: UserId }) {
		const tasklist = await this.tasklistFinder.run(params.tasklistId);

		this.guardTasklist({ tasklist, userId: params.userLoggedId });

		return tasklist;
	}

	private guardTasklist(params: { tasklist: TasklistEntity; userId: UserId }) {
		params.tasklist.isAllowedToBeShowed(params.userId);
	}
}
