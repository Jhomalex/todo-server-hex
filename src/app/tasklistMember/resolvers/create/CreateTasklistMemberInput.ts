import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreateTasklistMemberInput {
	@Field(() => ID)
	userId!: string;

	@Field(() => ID)
	tasklistId!: string;
}
