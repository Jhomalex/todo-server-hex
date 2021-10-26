import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { CreatedAt } from '@/app/shared/core/domain/valueObjects/CreatedAt';
import { UpdatedAt } from '@/app/shared/core/domain/valueObjects/UpdatedAt';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { ITasklistRepository } from '@/app/tasklist/core/domain/ITasklistRepository';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { UserFinderInteractor } from '@/app/user/core/domain/interactors/UserFinderInteractor';
import { IUserRepository } from '@/app/user/core/domain/IUserRepository';
import { TasklistMemberEntity } from '../entity/TasklistMemberEntity';
import { ITasklistMemberRepository } from '../ITasklistMemberRepository';

export class TasklistMemberCreatorInteractor {
	private userFinder;
	constructor(
		private props: {
			tasklistMemberRepo: ITasklistMemberRepository;
			userRepo: IUserRepository;
			tasklistRepo: ITasklistRepository;
		}
	) {
		this.userFinder = new UserFinderInteractor(this.props.userRepo);
	}

	async run(params: {
		userId: UserId;
		tasklistId: TasklistId;
		userLoggedId: UserId;
	}) {
		await this.exist({ tasklistId: params.tasklistId, userId: params.userId });
		await this.guardUserExist(params.userId);
		await this.guardTasklistExist(params.tasklistId);

		const tasklistMember = TasklistMemberEntity.create({
			userId: params.userId,
			tasklistId: params.tasklistId,
			createdAt: CreatedAt.now(),
			updatedAt: UpdatedAt.now(),
		});

		return await this.props.tasklistMemberRepo.create(tasklistMember);
	}

	private async exist(params: { userId: UserId; tasklistId: TasklistId }) {
		const tasklistMember = await this.props.tasklistMemberRepo.getById({
			tasklistId: params.tasklistId,
			userId: params.userId,
		});

		if (tasklistMember)
			throw new InvalidException('This tasklist member already exist');
	}

	private async guardUserExist(userId: UserId) {
		await this.userFinder.run(userId);
	}

	private async guardTasklistExist(tasklistId: TasklistId) {
		const tasklist = await this.props.tasklistRepo.getById(tasklistId);
		if (!tasklist) throw new InvalidException('This tasklist does not exist');
	}
}
