import { DateTimeValueObject } from './DateTimeValueObject';

export class CreatedAt extends DateTimeValueObject {
	static now() {
		return new CreatedAt(new Date());
	}
}
