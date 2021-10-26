import { Field, ObjectType, createUnionType } from 'type-graphql';
import { Invalid } from './Invalid';

@ObjectType()
export class SuccessString {
	@Field(() => String)
	message!: string;
}

export const StringResponse = createUnionType({
	name: 'StringResponse',
	types: () => [SuccessString, Invalid] as const,
	resolveType: value => {
		if ('reason' in value) {
			return Invalid;
		} else {
			return SuccessString;
		}
	},
});
