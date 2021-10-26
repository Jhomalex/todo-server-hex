import { Invalid } from '@/app/shared/resolvers/schemas/Invalid';
import { TasklistMember } from '@/app/tasklistMember/resolvers/TasklistMemberSchema';
import { createUnionType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Tasklist {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	name!: string;

	@Field(() => Boolean)
	isPublic!: boolean;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;

	@Field(() => [TasklistMember])
	tasklistMembers!: [TasklistMember];
}

@ObjectType()
export class TasklistList {
	@Field(() => [Tasklist])
	tasklists!: Tasklist[];
}

export const TasklistResponse = createUnionType({
	name: 'TasklistResponse',
	types: () => [Tasklist, Invalid] as const,
	resolveType: value => {
		if ('reason' in value) {
			return Invalid;
		} else {
			return Tasklist;
		}
	},
});

export const TasklistListResponse = createUnionType({
	name: 'TasklistListResponse',
	types: () => [TasklistList, Invalid] as const,
	resolveType: value => {
		if ('reason' in value) {
			return Invalid;
		} else {
			return TasklistList;
		}
	},
});
