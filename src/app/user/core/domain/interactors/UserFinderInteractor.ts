import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { UserId } from '../entity/properties/UserId';
import { IUserRepository } from '../IUserRepository';

export class UserFinderInteractor {
	constructor(private userRepo: IUserRepository) {}

	async run(id: UserId) {
		const user = await this.userRepo.getById(id);

		if (!user) throw new InvalidException('This user does not exist');

		return user;
	}
}
