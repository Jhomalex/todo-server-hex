import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Context } from '@/app/shared/resolvers/Context';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { listTaskByTasklistIdInteractor } from '../../core/usesCases';
import { TaskListResponse } from '../TaskSchema';
import { ListTaskInput } from './ListTaskInput';

@Resolver()
export class ListTaskResolver {
	@Query(() => TaskListResponse)
	async listTask(
		@Arg('data', () => ListTaskInput)
		data: ListTaskInput,
		@Ctx() ctx: Context
	) {
		try {
			if (!ctx.user) throw new InvalidException('Unauthorized');

			const tasks = await listTaskByTasklistIdInteractor.run({
				tasklistId: new TasklistId(data.tasklistId),
				userLoggedId: ctx.user.id,
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
