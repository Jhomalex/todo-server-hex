import { ApolloServer } from 'apollo-server-express';
import { buildGqlSchema } from '../app/shared/resolvers/gqlSchema';
import { createComplexityPlugin } from './pluggins/complexityPlugin';
import {
	fieldExtensionsEstimator,
	simpleEstimator,
} from 'graphql-query-complexity';
import { setSubscriptionPlugin } from './pluggins/subscriptionPlugin';
import { Server } from 'ws';
import { Express } from 'express';
import { env } from '@/config/env';

export async function startApolloServer({
	app,
	wsServer,
}: {
	app: Express;
	wsServer: Server;
}) {
	const schema = await buildGqlSchema();

	const apollo = new ApolloServer({
		schema,
		context: ({ req, res }) => {
			return { user: req.user, req, res };
		},
		formatError: err => {
			return {
				message: err.message,
				path: err.path,
				extensions: err.extensions,
			};
		},
		plugins: [
			createComplexityPlugin({
				schema,
				estimators: [
					fieldExtensionsEstimator(),
					simpleEstimator({ defaultComplexity: 2 }),
				],
				maximumComplexity: 100,
				onComplete: complexity => {
					if (complexity > 100) {
						throw new Error(
							`Sorry, too complicated query! ${complexity} is over that the max allowed complexity.`
						);
					}
					console.log('Used query complexity points:', complexity);
				},
			}),
			setSubscriptionPlugin(wsServer),
		],
	});

	await apollo.start();

	apollo.applyMiddleware({
		app,
		path: '/graphql',
		cors: env.app.env === 'test',
	});

	return { schema };
}
