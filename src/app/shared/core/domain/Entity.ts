export abstract class Entity {
	protected nullable = <T>(param?: T | null): T | null =>
		param ? param : null;
}
