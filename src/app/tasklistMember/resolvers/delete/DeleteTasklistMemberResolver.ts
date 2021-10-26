import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Context } from '@/app/shared/resolvers/Context';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { deleteTasklistMemberInteractor } from '../../core/usesCases';
import { TasklistMemberResponse } from '../TasklistMemberSchema';
import { DeleteTasklistMemberInput } from './DeleteTasklistMemberInput';

@Resolver()
export class DeleteTasklistMemberResolver {
	@Mutation(() => TasklistMemberResponse)
	async deleteTasklistMember(
		@Arg('data', () => DeleteTasklistMemberInput)
		data: DeleteTasklistMemberInput,
		@Ctx() ctx: Context
	) {
		try {
			if (!ctx.user) throw new InvalidException('Unauthorized');

			const tasklist = await deleteTasklistMemberInteractor.run({
				userId: new UserId(data.userId),
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
