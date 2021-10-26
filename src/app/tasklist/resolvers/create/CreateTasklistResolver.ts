import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Context } from '@/app/shared/resolvers/Context';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { TasklistName } from '../../core/domain/entity/properties/TasklistName';
import { createTasklistInteractor } from '../../core/usesCases';
import { TasklistResponse } from '../TasklistSchema';
import { CreateTasklistInput } from './CreateTasklistInput';

@Resolver()
export class CreateTasklistResolver {
	@Mutation(() => TasklistResponse)
	async createTasklist(
		@Arg('data', () => CreateTasklistInput) data: CreateTasklistInput,
		@Ctx() ctx: Context
	) {
		try {
			if (!ctx.user) throw new InvalidException('Unauthorized');

			const tasklist = await createTasklistInteractor.run({
				name: new TasklistName(data.name),
				userId: ctx.user.id,
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
