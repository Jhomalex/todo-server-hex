import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TasklistMemberEntity } from './entity/TasklistMemberEntity';

export interface ITasklistMemberRepository {
	listByTasklistId(tasklistId: TasklistId): Promise<TasklistMemberEntity[]>;
	delete(tasklistMember: TasklistMemberEntity): Promise<TasklistMemberEntity>;
	update(tasklistMember: TasklistMemberEntity): Promise<TasklistMemberEntity>;
	create(tasklistMember: TasklistMemberEntity): Promise<TasklistMemberEntity>;
	exist(userId: UserId, tasklistId: TasklistId): Promise<boolean>;
	getById(params: {
		userId: UserId;
		tasklistId: TasklistId;
	}): Promise<Nullable<TasklistMemberEntity>>;
}
