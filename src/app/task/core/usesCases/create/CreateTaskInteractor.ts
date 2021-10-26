import { CreatedAt } from '@/app/shared/core/domain/valueObjects/CreatedAt';
import { UpdatedAt } from '@/app/shared/core/domain/valueObjects/UpdatedAt';
import { TasklistEntity } from '@/app/tasklist/core/domain/entity/TasklistEntity';
import { TasklistFinderInteractor } from '@/app/tasklist/core/domain/interactors/TasklistFinderInteractor';
import { ITasklistRepository } from '@/app/tasklist/core/domain/ITasklistRepository';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TaskDescription } from '../../domain/entity/properties/TaskDescription';
import { TaskFinishedDate } from '../../domain/entity/properties/TaskFinishedDate';
import { TaskId } from '../../domain/entity/properties/TaskId';
import { TaskIsFinished } from '../../domain/entity/properties/TaskIsFinished';
import { TaskName } from '../../domain/entity/properties/TaskName';
import { TaskEntity } from '../../domain/entity/TaskEntity';
import { ITaskRepository } from '../../domain/ITaskRepository';

export class CreateTaskInteractor {
	private tasklistFinder;
	constructor(
		private props: {
			taskRepo: ITaskRepository;
			tasklistRepo: ITasklistRepository;
		}
	) {
		this.tasklistFinder = new TasklistFinderInteractor(props.tasklistRepo);
	}

	async run(params: {
		name: TaskName;
		description: TaskDescription;
		tasklistId: TaskId;
		finishedDate?: TaskFinishedDate;
		userLoggedId: UserId;
	}) {
		const tasklist = await this.tasklistFinder.run(params.tasklistId);

		this.guardTasklist({ tasklist, userId: params.userLoggedId });

		let task = TaskEntity.create({
			id: TaskId.random(),
			name: params.name,
			description: params.description,
			isFinished: new TaskIsFinished(false),
			tasklistId: params.tasklistId,
			createdAt: CreatedAt.now(),
			updatedAt: UpdatedAt.now(),
			finishedDate: params.finishedDate ? params.finishedDate : null,
		});

		task = await this.props.taskRepo.create(task);

		return task;
	}

	private guardTasklist(params: { tasklist: TasklistEntity; userId: UserId }) {
		params.tasklist.isAllowedToBeShowed(params.userId);
	}
}
