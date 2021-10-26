import { Invalid } from '@/app/shared/resolvers/schemas/Invalid';
import { createUnionType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	name!: string;

	@Field(() => String)
	username!: string;

	@Field(() => String)
	avatar!: string;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;
}

export const UserResponse = createUnionType({
	name: 'UserResponse',
	types: () => [User, Invalid] as const,
	resolveType: value => {
		if ('reason' in value) {
			return Invalid;
		} else {
			return User;
		}
	},
});
