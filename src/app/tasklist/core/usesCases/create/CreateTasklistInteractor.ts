import { TasklistMemberCreatorInteractor } from '@/app/tasklistMember/core/domain/interactors/TasklistMemberCreatorInteractor';
import { ITasklistMemberRepository } from '@/app/tasklistMember/core/domain/ITasklistMemberRepository';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { IUserRepository } from '@/app/user/core/domain/IUserRepository';
import { TasklistName } from '../../domain/entity/properties/TasklistName';
import { TasklistCreatorInteractor } from '../../domain/interactors/TasklistCreatorInteractor';
import { ITasklistRepository } from '../../domain/ITasklistRepository';

export class CreateTasklistInteractor {
	private tasklistCreator;
	private tasklistMemberCreator;
	constructor(
		private props: {
			tasklistRepo: ITasklistRepository;
			tasklistMemberRepo: ITasklistMemberRepository;
			userRepo: IUserRepository;
		}
	) {
		this.tasklistCreator = new TasklistCreatorInteractor(props.tasklistRepo);
		this.tasklistMemberCreator = new TasklistMemberCreatorInteractor({
			tasklistRepo: props.tasklistRepo,
			tasklistMemberRepo: props.tasklistMemberRepo,
			userRepo: props.userRepo,
		});
	}

	async run(params: { name: TasklistName; userId: UserId }) {
		const tasklist = await this.tasklistCreator.run(params.name);

		await this.tasklistMemberCreator.run({
			userId: params.userId,
			tasklistId: tasklist.id,
			userLoggedId: params.userId,
		});

		return tasklist;
	}
}
