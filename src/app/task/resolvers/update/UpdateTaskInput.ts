import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class UpdateTaskInput {
	@Field(() => ID)
	taskId!: string;

	@Field(() => String)
	name!: string;

	@Field(() => String)
	description!: string;

	@Field(() => Boolean)
	isFinished!: boolean;

	@Field(() => Date, { nullable: true })
	finishedDate?: Date;
}
