import { Invalid } from '@/app/shared/resolvers/schemas/Invalid';
import { User } from '@/app/user/resolvers/UserSchema';
import { createUnionType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TasklistMember {
	@Field(() => ID)
	userId!: string;

	@Field(() => ID)
	tasklistId!: string;

	@Field(() => User)
	user!: User;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;
}

@ObjectType()
export class TasklistMemberList {
	@Field(() => [TasklistMember])
	tasklistMembers!: TasklistMember[];
}

export const TasklistMemberResponse = createUnionType({
	name: 'TasklistMemberResponse',
	types: () => [TasklistMember, Invalid] as const,
	resolveType: value => {
		if ('reason' in value) {
			return Invalid;
		} else {
			return TasklistMember;
		}
	},
});

export const TasklistMemberListResponse = createUnionType({
	name: 'TasklistMemberListResponse',
	types: () => [TasklistMemberList, Invalid] as const,
	resolveType: value => {
		if ('reason' in value) {
			return Invalid;
		} else {
			return TasklistMemberList;
		}
	},
});
