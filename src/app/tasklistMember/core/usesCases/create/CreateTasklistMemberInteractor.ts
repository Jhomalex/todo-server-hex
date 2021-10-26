import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { ITasklistRepository } from '@/app/tasklist/core/domain/ITasklistRepository';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { IUserRepository } from '@/app/user/core/domain/IUserRepository';
import { TasklistMemberCreatorInteractor } from '../../domain/interactors/TasklistMemberCreatorInteractor';
import { ITasklistMemberRepository } from '../../domain/ITasklistMemberRepository';

export class CreateTasklistMemberInteractor {
	private tasklistMemberCreator;
	constructor(
		private props: {
			tasklistMemberRepo: ITasklistMemberRepository;
			userRepo: IUserRepository;
			tasklistRepo: ITasklistRepository;
		}
	) {
		this.tasklistMemberCreator = new TasklistMemberCreatorInteractor({
			tasklistMemberRepo: props.tasklistMemberRepo,
			tasklistRepo: props.tasklistRepo,
			userRepo: props.userRepo,
		});
	}

	async run(params: {
		userId: UserId;
		tasklistId: TasklistId;
		userLoggedId: UserId;
	}) {
		const tasklistMember = await this.tasklistMemberCreator.run({
			userId: params.userId,
			tasklistId: params.tasklistId,
			userLoggedId: params.userLoggedId,
		});

		return tasklistMember;
	}
}
