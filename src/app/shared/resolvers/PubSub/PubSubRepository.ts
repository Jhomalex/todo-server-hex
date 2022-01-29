import { PubSubEngine } from 'type-graphql';
import { AMQPPubSub } from 'graphql-amqp-subscriptions';
import { IPubSubRepository } from './core/IPubSubRepository';
import { connect } from 'amqplib';
import { env } from '@/config/env';

export class PubSubRepository implements IPubSubRepository {
	private async createConnection() {
		return await connect({
			protocol: env.rabbitmq.protocol,
			hostname: env.rabbitmq.host,
			port: env.rabbitmq.port,
			username: env.rabbitmq.username,
			password: env.rabbitmq.password,
		});
	}
	async getPubSub(): Promise<PubSubEngine> {
		const connection = await this.createConnection();
		return new AMQPPubSub({ connection });
	}
}
