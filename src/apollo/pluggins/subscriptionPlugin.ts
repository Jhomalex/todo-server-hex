import { PluginDefinition } from 'apollo-server-core';
import { Server } from 'ws';

export const setSubscriptionPlugin = (server: Server): PluginDefinition => {
	return {
		async requestDidStart() {
			return {
				async drainServer() {
					server.close();
				},
			};
		},
	};
};
