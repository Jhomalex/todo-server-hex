import { PubSubRepository } from '../../PubSubRepository';
import { GetPubSubInteractor } from './GetPubSubInteractor';

const pubSubRepo = new PubSubRepository();

export const getPubSubInteractor = new GetPubSubInteractor(pubSubRepo);
