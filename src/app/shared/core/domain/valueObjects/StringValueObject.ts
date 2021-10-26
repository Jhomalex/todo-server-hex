export abstract class StringValueObject {
	constructor(protected _value: string) {}

	get value(): string {
		return this._value;
	}
}
