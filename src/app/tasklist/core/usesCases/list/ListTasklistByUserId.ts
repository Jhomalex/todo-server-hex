import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { ITasklistRepository } from '../../domain/ITasklistRepository';

export class ListTasklistByUserIdInteractor {
	constructor(private tasklistRepo: ITasklistRepository) {}

	async run(userId: UserId) {
		const tasklist = await this.tasklistRepo.listByUserId(userId);

		return tasklist;
	}
}
