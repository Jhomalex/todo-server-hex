export class InvalidException extends Error {
	constructor(message: string) {
		super(message);
	}

	response() {
		return { reason: this.message };
	}
}
