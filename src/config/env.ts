import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const envFileName = `.env${
	process.env.NODE_ENV?.trim() && `.${process.env.NODE_ENV?.trim()}`
}`;
let pathToEnvFile = '';

if (process.env.NODE_ENV == 'test') {
	pathToEnvFile = path.resolve(__dirname, '../..', envFileName);
} else {
	pathToEnvFile = path.resolve(__dirname, '../..', envFileName);
}

const myEnv = dotenv.config({ path: pathToEnvFile });

dotenvExpand(myEnv);

const env = {
	app: {
		name: process.env.APP_NAME || 'project-api',
		port: parseInt(process.env.APP_PORT as string) || 3000,
		url: process.env.APP_URL || 'http://localhost:3000',
		frontUrl: process.env.FRONT_URL || 'http://localhost:8080',
		env: process.env.NODE_ENV,
	},
	db: {
		connection: process.env.DB_CONNECTION || 'pgsql',
		host: process.env.DB_HOST || '127.0.0.1',
		port: parseInt(process.env.DB_PORT as string) || 5432,
		database: process.env.DB_DATABASE as string,
		schema: process.env.DB_SCHEMA || 'public',
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD as string,
		url: process.env.DB_URL as string,
	},
	jwt: {
		secretKey: process.env.JWT_SECRET_KEY || 'h4l4M4dR1do7',
	},
};

export { env };
