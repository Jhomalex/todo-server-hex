import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TasklistId } from '../../domain/entity/properties/TasklistId';
import { TasklistIsPublic } from '../../domain/entity/properties/TasklistIsPublic';
import { TasklistName } from '../../domain/entity/properties/TasklistName';
import { TasklistEntity } from '../../domain/entity/TasklistEntity';
import { TasklistFinderInteractor } from '../../domain/interactors/TasklistFinderInteractor';
import { ITasklistRepository } from '../../domain/ITasklistRepository';

export class UpdateTasklistInteractor {
	private tasklistFinder;
	constructor(private tasklistRepo: ITasklistRepository) {
		this.tasklistFinder = new TasklistFinderInteractor(tasklistRepo);
	}

	async run(params: {
		tasklistId: TasklistId;
		name: TasklistName;
		isPublic: TasklistIsPublic;
		userLoggedId: UserId;
	}) {
		const tasklist = await this.tasklistFinder.run(params.tasklistId);

		this.guardTasklist({ tasklist, userId: params.userLoggedId });

		tasklist.name = params.name;
		tasklist.isPublic = params.isPublic;

		await this.tasklistRepo.update(tasklist);

		return tasklist;
	}

	private guardTasklist(params: { tasklist: TasklistEntity; userId: UserId }) {
		params.tasklist.isAllowedToBeShowed(params.userId);
	}
}
