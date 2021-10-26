import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { UserName } from '../../core/domain/entity/properties/UserName';
import { UserPassword } from '../../core/domain/entity/properties/UserPassword';
import { UserUsername } from '../../core/domain/entity/properties/UserUsername';
import { signupInteractor } from '../../core/usesCases';
import { UserResponse } from '../UserSchema';
import { SignupInput } from './SignupInput';

@Resolver()
export class SignupResolver {
	@Mutation(() => UserResponse)
	async signup(@Arg('data', () => SignupInput) data: SignupInput) {
		try {
			const res = await signupInteractor.run({
				name: new UserName(data.name),
				username: new UserUsername(data.username),
				password: new UserPassword(data.password),
			});
			return res.toPrimitives();
		} catch (err) {
			if (err instanceof InvalidException) return err.response();

			console.error(err);
			throw new Error(
				'Ha ocurrido un error en el servidor al ejecutar la petición'
			);
		}
	}
}
