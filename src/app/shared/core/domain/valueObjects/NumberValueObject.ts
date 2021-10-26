export abstract class NumberValueObject {
	constructor(protected _value: number) {}

	get value(): number {
		return this._value;
	}
}
