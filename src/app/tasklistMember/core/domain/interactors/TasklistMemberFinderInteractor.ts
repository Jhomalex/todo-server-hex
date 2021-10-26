import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { ITasklistMemberRepository } from '../ITasklistMemberRepository';

export class TasklistMemberFinderInteractor {
	constructor(private tasklistMemberRepo: ITasklistMemberRepository) {}

	async run(params: { userId: UserId; tasklistId: TasklistId }) {
		const tasklistMember = await this.tasklistMemberRepo.getById({
			userId: params.userId,
			tasklistId: params.tasklistId,
		});

		if (!tasklistMember)
			throw new InvalidException('The user does not match with any tasklist');

		return tasklistMember;
	}
}
