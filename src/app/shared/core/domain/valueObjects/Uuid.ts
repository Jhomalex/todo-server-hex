import crypto from 'crypto';

export class Uuid {
	constructor(protected _value: string) {}

	static random(): Uuid {
		return new Uuid(crypto.randomUUID());
	}

	get value(): string {
		return this._value;
	}

	equals(val: Uuid): boolean {
		return this._value === val._value;
	}

	toString(): string {
		return this._value;
	}
}
