import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { TasklistEntity } from '@/app/tasklist/core/domain/entity/TasklistEntity';
import { TasklistFinderInteractor } from '@/app/tasklist/core/domain/interactors/TasklistFinderInteractor';
import { ITasklistRepository } from '@/app/tasklist/core/domain/ITasklistRepository';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TasklistMemberFinderInteractor } from '../../domain/interactors/TasklistMemberFinderInteractor';
import { ITasklistMemberRepository } from '../../domain/ITasklistMemberRepository';

export class DeleteTasklistMemberInteractor {
	private tasklistMemberFinder;
	private tasklistFinder;
	constructor(
		private props: {
			tasklistMemberRepo: ITasklistMemberRepository;
			tasklistRepo: ITasklistRepository;
		}
	) {
		this.tasklistMemberFinder = new TasklistMemberFinderInteractor(
			props.tasklistMemberRepo
		);
		this.tasklistFinder = new TasklistFinderInteractor(props.tasklistRepo);
	}

	async run(params: {
		userId: UserId;
		tasklistId: TasklistId;
		userLoggedId: UserId;
	}) {
		const tasklist = await this.tasklistFinder.run(params.tasklistId);

		this.guardTasklist({ tasklist, userId: params.userLoggedId });
		const tasklistMember = await this.tasklistMemberFinder.run({
			userId: params.userId,
			tasklistId: params.tasklistId,
		});

		await this.props.tasklistMemberRepo.delete(tasklistMember);

		return tasklistMember;
	}

	private guardTasklist(params: { tasklist: TasklistEntity; userId: UserId }) {
		params.tasklist.isAllowedToBeShowed(params.userId);
	}
}
