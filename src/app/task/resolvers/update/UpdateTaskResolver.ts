import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Context } from '@/app/shared/resolvers/Context';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { TaskDescription } from '../../core/domain/entity/properties/TaskDescription';
import { TaskFinishedDate } from '../../core/domain/entity/properties/TaskFinishedDate';
import { TaskId } from '../../core/domain/entity/properties/TaskId';
import { TaskIsFinished } from '../../core/domain/entity/properties/TaskIsFinished';
import { TaskName } from '../../core/domain/entity/properties/TaskName';
import { updateTaskInteractor } from '../../core/usesCases';
import { TaskResponse } from '../TaskSchema';
import { UpdateTaskInput } from './UpdateTaskInput';

@Resolver()
export class UpdateTaskResolver {
	@Mutation(() => TaskResponse)
	async updateTask(
		@Arg('data', () => UpdateTaskInput)
		data: UpdateTaskInput,
		@Ctx() ctx: Context
	) {
		try {
			if (!ctx.user) throw new InvalidException('Unauthorized');

			const task = await updateTaskInteractor.run({
				taskId: new TaskId(data.taskId),
				name: new TaskName(data.name),
				description: new TaskDescription(data.description),
				finishedDate: data.finishedDate
					? new TaskFinishedDate(data.finishedDate)
					: undefined,
				isFinished: new TaskIsFinished(data.isFinished),
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
