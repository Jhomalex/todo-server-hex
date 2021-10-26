import { Field, InputType } from 'type-graphql';

@InputType()
export class SignupInput {
	@Field(() => String)
	name!: string;

	@Field(() => String)
	username!: string;

	@Field(() => String)
	password!: string;
}
