import 'module-alias/register';
import './config/aliasModule';
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import { env } from '@/config/env';
import http from 'http';
import { startApolloServer } from '@/apollo/apolloServer';

async function main() {
	const app = await startApolloServer();

	// Settings
	app.set('port', env.app.port);
	app.set('view engine', 'html');
	const server = new http.Server(app);

	// Middleware
	app.use(morgan('dev'));
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.set('trust proxy', true);

	//Router

	server.listen(app.get('port'));

	// Public
	app.use(express.static('./public'));
	app.use(express.static('./resources'));

	console.log(`🚀 Server ready on ${env.app.url}`);
}

main();
