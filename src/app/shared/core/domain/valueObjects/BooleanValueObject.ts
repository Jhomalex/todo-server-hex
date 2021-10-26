export abstract class BooleanValueObject {
	constructor(protected _value: boolean) {}

	public get value(): boolean {
		return this._value;
	}
}
