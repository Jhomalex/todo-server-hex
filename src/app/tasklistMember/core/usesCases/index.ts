import { TasklistRepository } from '@/app/tasklist/dataSources/TasklistRepository';
import { UserRepository } from '@/app/user/dataSources/UserRepository';
import { TasklistMemberRepository } from '../../dataSources/TasklistMemberRepository';
import { CreateTasklistMemberInteractor } from './create/CreateTasklistMemberInteractor';
import { DeleteTasklistMemberInteractor } from './delete/DeleteTasklistMemberInteractor';

const tasklistMemberRepo = new TasklistMemberRepository();
const tasklistRepo = new TasklistRepository();
const userRepo = new UserRepository();

export const createTasklistMemberInteractor =
	new CreateTasklistMemberInteractor({
		tasklistMemberRepo,
		tasklistRepo,
		userRepo,
	});
export const deleteTasklistMemberInteractor =
	new DeleteTasklistMemberInteractor({
		tasklistMemberRepo: tasklistMemberRepo,
		tasklistRepo: tasklistRepo,
	});
