import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from '@/config/env';
import { UserRepository } from '@/app/user/dataSources/UserRepository';
import { UserUsername } from '@/app/user/core/domain/entity/properties/UserUsername';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';

const passportOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: env.jwt.secretKey,
};

const userRepo = new UserRepository();

/**
 * Middleware that allow autentication with tokens
 */
passport.use(
	new Strategy(passportOptions, async (jwt_payload, done) => {
		const username = jwt_payload.username;
		const user = await userRepo.getByUsername(new UserUsername(username));
		done(null, user);
	})
);

/**
 * Serielize the ID of an user
 */
passport.serializeUser((user: any, done) => {
	return done(null, user.id);
});

/**
 * Deserialize the ID of an user
 */
passport.deserializeUser(async (id: string, done) => {
	const user = await userRepo.getById(new UserId(id));
	return done(null, user);
});

export { passport };
