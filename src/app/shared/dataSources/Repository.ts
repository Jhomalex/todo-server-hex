import { PrismaClient } from '.prisma/client';

export class Repository {
	protected prisma = new PrismaClient();
}
