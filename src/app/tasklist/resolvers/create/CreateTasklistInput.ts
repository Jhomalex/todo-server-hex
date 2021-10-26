import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTasklistInput {
	@Field(() => String)
	name!: string;
}
