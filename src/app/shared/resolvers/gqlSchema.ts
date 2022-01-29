import { buildSchema } from 'type-graphql';
import * as user from '@/app/user/resolvers';
import * as tasklist from '@/app/tasklist/resolvers';
import * as tasklistMember from '@/app/tasklistMember/resolvers';
import * as task from '@/app/task/resolvers';
import { PubSub } from 'graphql-subscriptions';

export const buildGqlSchema = async () => {
	const pubSub = new PubSub();
	return await buildSchema({
		resolvers: [
			user.SigninResolver,
			user.SignupResolver,
			tasklist.CreateTasklistResolver,
			tasklist.ListTasklistResolver,
			tasklist.DeleteTasklistResolver,
			tasklist.UpdateTasklistResolver,
			tasklist.GetTasklistByIdResolver,
			tasklistMember.CreateTasklistMemberResolver,
			tasklistMember.DeleteTasklistMemberResolver,
			task.CreateTaskResolver,
			task.DeleteTaskResolver,
			task.ListTaskResolver,
			task.UpdateTaskResolver,
			task.ListTaskSubResolver,
		],
		validate: true,
		pubSub,
	});
};
