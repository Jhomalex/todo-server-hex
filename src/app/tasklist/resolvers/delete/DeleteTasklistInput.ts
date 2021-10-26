import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class DeleteTasklistInput {
	@Field(() => ID)
	tasklistId!: string;
}
