import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class DeleteTaskInput {
	@Field(() => ID)
	taskId!: string;
}
