import { PrismaClient } from '.prisma/client';

export class DataSource {
	protected prisma = new PrismaClient();
}
