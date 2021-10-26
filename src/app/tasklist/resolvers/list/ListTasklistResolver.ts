import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Context } from '@/app/shared/resolvers/Context';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { Ctx, Query, Resolver } from 'type-graphql';
import { listTasklistInteractor } from '../../core/usesCases';
import { TasklistListResponse } from '../TasklistSchema';

@Resolver()
export class ListTasklistResolver {
	@Query(() => TasklistListResponse)
	async listTasklist(@Ctx() ctx: Context) {
		try {
			if (!ctx.user) throw new InvalidException('Unauthorized');

			const tasklist = await listTasklistInteractor.run(
				new UserId(ctx.user.id.value)
			);

			return { tasklists: tasklist.map(tl => tl.toPrimitives()) };
		} catch (err) {
			if (err instanceof InvalidException) return err.response();

			console.error(err);
			throw new Error(
				'Ha ocurrido un error en el servidor al ejecutar la petición'
			);
		}
	}
}
