import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class ListTaskInput {
	@Field(() => ID)
	tasklistId!: string;

	@Field(() => UserId)
	userLoggedId!: UserId;
}
