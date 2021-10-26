import { CreatedAt } from '@/app/shared/core/domain/valueObjects/CreatedAt';
import { UpdatedAt } from '@/app/shared/core/domain/valueObjects/UpdatedAt';
import { TasklistId } from '../entity/properties/TasklistId';
import { TasklistIsPublic } from '../entity/properties/TasklistIsPublic';
import { TasklistName } from '../entity/properties/TasklistName';
import { TasklistEntity } from '../entity/TasklistEntity';
import { ITasklistRepository } from '../ITasklistRepository';

export class TasklistCreatorInteractor {
	constructor(private tasklistRepo: ITasklistRepository) {}

	async run(name: TasklistName) {
		let tasklist = TasklistEntity.create({
			id: TasklistId.random(),
			name: name,
			isPublic: new TasklistIsPublic(false),
			createdAt: CreatedAt.now(),
			updatedAt: UpdatedAt.now(),
		});

		tasklist = await this.tasklistRepo.create(tasklist);

		return tasklist;
	}
}
