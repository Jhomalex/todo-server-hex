import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class GetTasklistByIdInput {
	@Field(() => ID)
	tasklistId!: string;
}
