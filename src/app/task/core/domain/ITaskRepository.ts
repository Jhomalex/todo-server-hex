import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { TaskId } from './entity/properties/TaskId';
import { TaskEntity } from './entity/TaskEntity';

export interface ITaskRepository {
	listByTasklistId(tasklistId: TasklistId): Promise<TaskEntity[]>;
	delete(task: TaskEntity): Promise<TaskEntity>;
	update(task: TaskEntity): Promise<TaskEntity>;
	create(task: TaskEntity): Promise<TaskEntity>;
	exist(id: TaskId): Promise<boolean>;
	getById(id: TaskId): Promise<Nullable<TaskEntity>>;
}
