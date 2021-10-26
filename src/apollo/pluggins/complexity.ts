import { GraphQLSchema } from 'graphql';
import {
	fieldExtensionsEstimator,
	getComplexity,
	simpleEstimator,
} from 'graphql-query-complexity';

export const gqlComplexityPluggin = (schema: GraphQLSchema) => ({
	didResolveOperation({ request, document }: { request: any; document: any }) {
		const complexity = getComplexity({
			schema,
			operationName: request.operationName,
			query: document,
			variables: request.variables,
			estimators: [
				fieldExtensionsEstimator(),
				simpleEstimator({ defaultComplexity: 2 }),
			],
		});
		if (complexity > 40) {
			throw new Error(
				`Sorry, too complicated query! ${complexity} is over 50 that is the max allowed complexity.`
			);
		}
		console.log('Used query complexity points:', complexity);
	},
});
