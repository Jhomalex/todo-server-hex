import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TasklistId } from './entity/properties/TasklistId';
import { TasklistEntity } from './entity/TasklistEntity';

export interface ITasklistRepository {
	listByUserId(userId: UserId): Promise<TasklistEntity[]>;
	delete(tasklist: TasklistEntity): Promise<TasklistEntity>;
	update(tasklist: TasklistEntity): Promise<TasklistEntity>;
	create(tasklist: TasklistEntity): Promise<TasklistEntity>;
	exist(id: TasklistId): Promise<boolean>;
	getById(id: TasklistId): Promise<Nullable<TasklistEntity>>;
}
