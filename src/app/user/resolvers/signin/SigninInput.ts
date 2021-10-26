import { Field, InputType } from 'type-graphql';

@InputType()
export class SigninInput {
	@Field(() => String)
	username!: string;

	@Field(() => String)
	password!: string;
}
