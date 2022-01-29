import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { Subscription, Resolver, Root } from 'type-graphql';
import { listTaskByTasklistIdInteractor } from '../../core/usesCases';
import { ListTaskInput } from './ListTaskInput';
import { TaskListResponse } from '../TaskSchema';

@Resolver()
export class ListTaskSubResolver {
	@Subscription(() => TaskListResponse, { topics: 'LISTTASK' })
	async listTaskSub(@Root() payload: ListTaskInput) {
		try {
			const tasks = await listTaskByTasklistIdInteractor.run({
				tasklistId: new TasklistId(payload.tasklistId),
				userLoggedId: payload.userLoggedId,
			});

			return { tasks: tasks.map(t => t.toPrimitives()) };
		} catch (err) {
			if (err instanceof InvalidException) return err.response();

			console.error(err);
			throw new Error(
				'Ha ocurrido un error en el servidor al ejecutar la petición'
			);
		}
	}
}
