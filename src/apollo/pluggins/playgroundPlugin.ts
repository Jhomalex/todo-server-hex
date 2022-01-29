import { env } from '@/config/env';
import {
	ApolloServerPluginLandingPageDisabled,
	ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';

export const setPlaygroundPlugin = () =>
	env.app.env === 'production'
		? ApolloServerPluginLandingPageDisabled()
		: ApolloServerPluginLandingPageGraphQLPlayground();
