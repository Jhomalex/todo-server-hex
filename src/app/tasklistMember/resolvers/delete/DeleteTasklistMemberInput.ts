import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class DeleteTasklistMemberInput {
	@Field(() => ID)
	userId!: string;

	@Field(() => ID)
	tasklistId!: string;
}
