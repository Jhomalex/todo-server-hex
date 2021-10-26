import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Context } from '@/app/shared/resolvers/Context';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { TaskId } from '../../core/domain/entity/properties/TaskId';
import { deleteTaskInteractor } from '../../core/usesCases';
import { TaskResponse } from '../TaskSchema';
import { DeleteTaskInput } from './DeleteTaskInput';

@Resolver()
export class DeleteTaskResolver {
	@Mutation(() => TaskResponse)
	async deleteTask(
		@Arg('data', () => DeleteTaskInput)
		data: DeleteTaskInput,
		@Ctx() ctx: Context
	) {
		try {
			if (!ctx.user) throw new InvalidException('Unauthorized');

			const task = await deleteTaskInteractor.run({
				taskId: new TaskId(data.taskId),
				userLoggedId: ctx.user.id,
			});

			return task.toPrimitives();
		} catch (err) {
			if (err instanceof InvalidException) return err.response();

			console.error(err);
			throw new Error(
				'Ha ocurrido un error en el servidor al ejecutar la petición'
			);
		}
	}
}
