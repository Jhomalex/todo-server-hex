import { DateTimeValueObject } from './DateTimeValueObject';

export class UpdatedAt extends DateTimeValueObject {
	static now() {
		return new UpdatedAt(new Date());
	}
}
