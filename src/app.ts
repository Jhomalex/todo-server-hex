import 'module-alias/register';
import './config/aliasModule';
import 'reflect-metadata';
import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { cors } from './config/cors';
import { env } from '@/config/env';
import { useServer } from 'graphql-ws/lib/use/ws';
import { startApolloServer } from '@/apollo/apolloServer';
import { isLoggedIn } from './app/shared/resolvers/middlewares/auth';

async function main() {
	const app = express();

	// Settings
	app.set('port', env.app.port);
	app.set('view engine', 'html');

	// Middlewares
	app.use(passport.initialize());
	app.use('/graphql', isLoggedIn);
	app.use(cors());
	app.use(morgan('dev'));
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.set('trust proxy', true);

	// Public
	app.use(express.static('./public'));
	app.use(express.static('./resources'));

	const server = createServer(app);
	const wsServer = new WebSocketServer({
		server: server,
		path: '/graphql',
	});
	const { schema } = await startApolloServer({
		app,
		wsServer,
	});

	//Router
	server.listen({ port: env.app.port }, () => {
		useServer({ schema }, wsServer);
	});

	console.log(`🚀 Server ready on ${env.app.url}`);
}

main();
