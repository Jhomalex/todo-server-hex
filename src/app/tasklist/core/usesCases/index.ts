import { TaskRepository } from '@/app/task/dataSources/TaskRepository';
import { TasklistMemberRepository } from '@/app/tasklistMember/dataSources/TasklistMemberRepository';
import { UserRepository } from '@/app/user/dataSources/UserRepository';
import { TasklistRepository } from '../../dataSources/TasklistRepository';
import { CreateTasklistInteractor } from './create/CreateTasklistInteractor';
import { DeleteTasklistInteractor } from './delete/DeleteTasklistInteractor';
import { GetTasklistByIdInteractor } from './get/GetTasklistByIdInteractor';
import { ListTasklistByUserIdInteractor } from './list/ListTasklistByUserId';
import { UpdateTasklistInteractor } from './update/UpdateTaskListInteractor';

const tasklistRepo = new TasklistRepository();
const tasklistMemberRepo = new TasklistMemberRepository();
const userRepo = new UserRepository();
const taskRepo = new TaskRepository();

export const createTasklistInteractor = new CreateTasklistInteractor({
	tasklistRepo,
	tasklistMemberRepo,
	userRepo,
});
export const listTasklistInteractor = new ListTasklistByUserIdInteractor(
	tasklistRepo
);
export const deleteTasklistInteractor = new DeleteTasklistInteractor({
	tasklistRepo,
	tasklistMemberRepo,
	taskRepo,
});
export const updateTasklistInteractor = new UpdateTasklistInteractor(
	tasklistRepo
);
export const getTasklistByIdInteractor = new GetTasklistByIdInteractor(
	tasklistRepo
);
