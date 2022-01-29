import { IPubSubRepository } from '../IPubSubRepository';

export class GetPubSubInteractor {
	constructor(private pubSubRepo: IPubSubRepository) {}

	run() {
		return this.pubSubRepo.getPubSub();
	}
}
