import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Invalid {
	@Field(() => String)
	reason!: string;
}
