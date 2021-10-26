import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class UpdateTasklistInput {
	@Field(() => ID)
	tasklistId!: string;

	@Field(() => String)
	name!: string;

	@Field(() => Boolean)
	isPublic!: boolean;
}
