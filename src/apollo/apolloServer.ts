import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { passport } from '../app/shared/resolvers/middlewares/passport';
import { isLoggedIn } from '../app/shared/resolvers/middlewares/auth';
import { buildGqlSchema } from '../app/shared/resolvers/gqlSchema';
import { cors } from '../config/cors';
import { createComplexityPlugin } from './pluggins/complexityPlugin';
import {
	fieldExtensionsEstimator,
	simpleEstimator,
} from 'graphql-query-complexity';

export async function startApolloServer() {
	const app: express.Application = express();
	const schema = await buildGqlSchema();

	app.use(passport.initialize());
	app.use(cors());
	app.use('/graphql', isLoggedIn);

	const server = new ApolloServer({
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
				maximumComplexity: 1000,
				onComplete: complexity => {
					if (complexity > 70) {
						throw new Error(
							`Sorry, too complicated query! ${complexity} is over 50 that is the max allowed complexity.`
						);
					}
					console.log('Used query complexity points:', complexity);
				},
			}),
		],
	});

	await server.start();

	server.applyMiddleware({ app, path: '/graphql', cors: false });

	return app;
}
