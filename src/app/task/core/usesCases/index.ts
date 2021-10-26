import { TasklistRepository } from '@/app/tasklist/dataSources/TasklistRepository';
import { TaskRepository } from '../../dataSources/TaskRepository';
import { CreateTaskInteractor } from './create/CreateTaskInteractor';
import { DeleteTaskInteractor } from './delete/DeleteTaskInteractor';
import { ListTaskByTasklistIdInteractor } from './list/ListTaskByTasklistIdInteractor';
import { UpdateTaskInteractor } from './update/UpdateTaskInteractor';

const taskRepo = new TaskRepository();
const tasklistRepo = new TasklistRepository();

export const createTaskInteractor = new CreateTaskInteractor({
	taskRepo,
	tasklistRepo,
});
export const deleteTaskInteractor = new DeleteTaskInteractor(taskRepo);
export const listTaskByTasklistIdInteractor =
	new ListTaskByTasklistIdInteractor({ taskRepo, tasklistRepo });
export const updateTaskInteractor = new UpdateTaskInteractor(taskRepo);
