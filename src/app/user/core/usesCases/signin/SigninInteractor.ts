import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { UserPassword } from '../../domain/entity/properties/UserPassword';
import { UserUsername } from '../../domain/entity/properties/UserUsername';
import { UserEntity } from '../../domain/entity/UserEntity';
import { IUserRepository } from '../../domain/IUserRepository';

export class SigninInteractor {
	constructor(private userRepo: IUserRepository) {}

	async run(params: {
		username: UserUsername;
		password: UserPassword;
	}): Promise<{ user: UserEntity; token: string }> {
		const user = await this.userRepo.getByUsername(params.username);

		if (!user) throw new InvalidException('This user does not exist');

		const isValidPassword = await user.validatePassword(params.password);

		if (!isValidPassword)
			throw new InvalidException('The username or password are invalids');

		const token = user.jwtgen();
		return { user, token };
	}
}
