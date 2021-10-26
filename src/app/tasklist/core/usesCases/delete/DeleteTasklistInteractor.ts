import { ITaskRepository } from '@/app/task/core/domain/ITaskRepository';
import { ITasklistMemberRepository } from '@/app/tasklistMember/core/domain/ITasklistMemberRepository';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TasklistId } from '../../domain/entity/properties/TasklistId';
import { TasklistEntity } from '../../domain/entity/TasklistEntity';
import { TasklistFinderInteractor } from '../../domain/interactors/TasklistFinderInteractor';
import { ITasklistRepository } from '../../domain/ITasklistRepository';

export class DeleteTasklistInteractor {
	private tasklistFinder;
	constructor(
		private props: {
			tasklistRepo: ITasklistRepository;
			tasklistMemberRepo: ITasklistMemberRepository;
			taskRepo: ITaskRepository;
		}
	) {
		this.tasklistFinder = new TasklistFinderInteractor(props.tasklistRepo);
	}

	async run(params: { tasklistId: TasklistId; userLoggedId: UserId }) {
		const tasklist = await this.tasklistFinder.run(params.tasklistId);

		this.guardTasklist({ tasklist, userId: params.userLoggedId });

		const tasklistMembers =
			await this.props.tasklistMemberRepo.listByTasklistId(tasklist.id);

		for await (const tasklistMember of tasklistMembers) {
			await this.props.tasklistMemberRepo.delete(tasklistMember);
		}

		const tasks = await this.props.taskRepo.listByTasklistId(tasklist.id);

		for await (const task of tasks) {
			await this.props.taskRepo.delete(task);
		}

		await this.props.tasklistRepo.delete(tasklist);

		return tasklist;
	}

	private guardTasklist(params: { tasklist: TasklistEntity; userId: UserId }) {
		params.tasklist.isAllowedToBeShowed(params.userId);
	}
}
