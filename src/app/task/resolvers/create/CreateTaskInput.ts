import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreateTaskInput {
	@Field(() => String)
	name!: string;

	@Field(() => String)
	description!: string;

	@Field(() => ID)
	tasklistId!: string;

	@Field(() => Date, { nullable: true })
	finishedDate?: Date;
}
