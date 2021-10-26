import { Invalid } from '@/app/shared/resolvers/schemas/Invalid';
import { createUnionType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Task {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	name!: string;

	@Field(() => String)
	description!: string;

	@Field(() => Boolean)
	isFinished!: boolean;

	@Field(() => Date, { nullable: true })
	finishedDate?: Date;

	@Field(() => ID)
	tasklistId!: string;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;
}

@ObjectType()
export class TaskList {
	@Field(() => [Task])
	tasks!: Task[];
}

export const TaskResponse = createUnionType({
	name: 'TaskResponse',
	types: () => [Task, Invalid] as const,
	resolveType: value => {
		if ('reason' in value) {
			return Invalid;
		} else {
			return Task;
		}
	},
});

export const TaskListResponse = createUnionType({
	name: 'TaskListResponse',
	types: () => [TaskList, Invalid] as const,
	resolveType: value => {
		if ('reason' in value) {
			return Invalid;
		} else {
			return TaskList;
		}
	},
});
