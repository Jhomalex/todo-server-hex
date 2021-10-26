import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Arg, Query, Resolver } from 'type-graphql';
import { SigninInput } from './SigninInput';
import { UserTokenResponse } from '../UserTokenSchema';
import { signinInteractor } from '../../core/usesCases';
import { UserUsername } from '../../core/domain/entity/properties/UserUsername';
import { UserPassword } from '../../core/domain/entity/properties/UserPassword';

@Resolver()
export class SigninResolver {
	@Query(() => UserTokenResponse)
	async signin(@Arg('data', () => SigninInput) data: SigninInput) {
		try {
			const res = await signinInteractor.run({
				username: new UserUsername(data.username),
				password: new UserPassword(data.password),
			});
			return { user: res.user.toPrimitives(), token: res.token };
		} catch (err) {
			if (err instanceof InvalidException) return err.response();

			console.error(err);
			throw new Error(
				'Ha ocurrido un error en el servidor al ejecutar la petición'
			);
		}
	}
}
