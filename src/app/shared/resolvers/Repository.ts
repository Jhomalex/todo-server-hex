import { PrismaClient } from '.prisma/client';

export abstract class Repository {
	protected prisma;

	constructor() {
		this.prisma = new PrismaClient();
	}
}
