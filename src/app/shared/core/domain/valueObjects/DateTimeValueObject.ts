export abstract class DateTimeValueObject {
	constructor(protected _value: Date) {}

	get value(): Date {
		return this._value;
	}
}
