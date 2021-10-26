import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Context } from '@/app/shared/resolvers/Context';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { TasklistId } from '../../core/domain/entity/properties/TasklistId';
import { deleteTasklistInteractor } from '../../core/usesCases';
import { TasklistResponse } from '../TasklistSchema';
import { DeleteTasklistInput } from './DeleteTasklistInput';

@Resolver()
export class DeleteTasklistResolver {
	@Mutation(() => TasklistResponse)
	async deleteTasklist(
		@Arg('data', () => DeleteTasklistInput) data: DeleteTasklistInput,
		@Ctx() ctx: Context
	) {
		try {
			if (!ctx.user) throw new InvalidException('Unauthorized');

			const tasklist = await deleteTasklistInteractor.run({
				tasklistId: new TasklistId(data.tasklistId),
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
