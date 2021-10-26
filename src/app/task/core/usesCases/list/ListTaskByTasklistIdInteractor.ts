import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { TasklistEntity } from '@/app/tasklist/core/domain/entity/TasklistEntity';
import { TasklistFinderInteractor } from '@/app/tasklist/core/domain/interactors/TasklistFinderInteractor';
import { ITasklistRepository } from '@/app/tasklist/core/domain/ITasklistRepository';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { ITaskRepository } from '../../domain/ITaskRepository';

export class ListTaskByTasklistIdInteractor {
	private tasklistFinder;
	constructor(
		private props: {
			taskRepo: ITaskRepository;
			tasklistRepo: ITasklistRepository;
		}
	) {
		this.tasklistFinder = new TasklistFinderInteractor(props.tasklistRepo);
	}

	async run(params: { tasklistId: TasklistId; userLoggedId: UserId }) {
		const tasklist = await this.tasklistFinder.run(params.tasklistId);

		this.guardTasklist({ tasklist, userId: params.userLoggedId });

		const taskList = await this.props.taskRepo.listByTasklistId(
			params.tasklistId
		);

		return taskList;
	}

	private guardTasklist(params: { tasklist: TasklistEntity; userId: UserId }) {
		params.tasklist.isAllowedToBeShowed(params.userId);
	}
}
