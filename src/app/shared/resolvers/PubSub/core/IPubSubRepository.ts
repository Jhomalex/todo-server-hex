import { PubSubEngine } from 'type-graphql';

export interface IPubSubRepository {
	getPubSub(): Promise<PubSubEngine>;
}
