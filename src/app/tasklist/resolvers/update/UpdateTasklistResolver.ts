import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Context } from '@/app/shared/resolvers/Context';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { TasklistId } from '../../core/domain/entity/properties/TasklistId';
import { TasklistIsPublic } from '../../core/domain/entity/properties/TasklistIsPublic';
import { TasklistName } from '../../core/domain/entity/properties/TasklistName';
import { updateTasklistInteractor } from '../../core/usesCases';
import { TasklistResponse } from '../TasklistSchema';
import { UpdateTasklistInput } from './UpdateTasklistInput';

@Resolver()
export class UpdateTasklistResolver {
	@Mutation(() => TasklistResponse)
	async updateTasklist(
		@Arg('data', () => UpdateTasklistInput) data: UpdateTasklistInput,
		@Ctx() ctx: Context
	) {
		try {
			if (!ctx.user) throw new InvalidException('Unauthorized');

			const tasklist = await updateTasklistInteractor.run({
				tasklistId: new TasklistId(data.tasklistId),
				isPublic: new TasklistIsPublic(data.isPublic),
				name: new TasklistName(data.name),
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
