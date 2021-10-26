import { Invalid } from '@/app/shared/resolvers/schemas/Invalid';
import { Field, ObjectType, createUnionType } from 'type-graphql';
import { User } from './UserSchema';

@ObjectType()
export class UserToken {
	@Field(() => User)
	user!: User;

	@Field(() => String)
	token!: string;
}

export const UserTokenResponse = createUnionType({
	name: 'UserTokenResponse',
	types: () => [UserToken, Invalid] as const,
	resolveType: value => {
		if ('reason' in value) {
			return Invalid;
		} else {
			return UserToken;
		}
	},
});
