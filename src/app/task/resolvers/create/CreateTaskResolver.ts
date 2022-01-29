import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Context } from '@/app/shared/resolvers/Context';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import {
	Arg,
	Ctx,
	Mutation,
	PubSub,
	PubSubEngine,
	Resolver,
} from 'type-graphql';
import { TaskDescription } from '../../core/domain/entity/properties/TaskDescription';
import { TaskFinishedDate } from '../../core/domain/entity/properties/TaskFinishedDate';
import { TaskName } from '../../core/domain/entity/properties/TaskName';
import { createTaskInteractor } from '../../core/usesCases';
import { TaskResponse } from '../TaskSchema';
import { CreateTaskInput } from './CreateTaskInput';

@Resolver()
export class CreateTaskResolver {
	@Mutation(() => TaskResponse)
	async createTask(
		@PubSub() pubSub: PubSubEngine,
		@Arg('data', () => CreateTaskInput)
		data: CreateTaskInput,
		@Ctx() ctx: Context
	) {
		try {
			if (!ctx.user) throw new InvalidException('Unauthorized');

			const tasklist = await createTaskInteractor.run({
				name: new TaskName(data.name),
				description: new TaskDescription(data.description),
				tasklistId: new TasklistId(data.tasklistId),
				finishedDate: data.finishedDate
					? new TaskFinishedDate(data.finishedDate)
					: undefined,
				userLoggedId: ctx.user.id,
			});

			await pubSub.publish('LISTTASK', {
				tasklistId: data.tasklistId,
				userLoggedId: ctx.user.id,
			});

			return tasklist.toPrimitives();
		} catch (err) {
			if (err instanceof InvalidException) return err.response();

			console.error(err);
			throw new Error(
				'Ha ocurrido un error en el servidor al ejecutar la petición'
			);
		}
	}
}
