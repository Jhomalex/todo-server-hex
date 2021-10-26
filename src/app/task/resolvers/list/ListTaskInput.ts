import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class ListTaskInput {
	@Field(() => ID)
	tasklistId!: string;
}
