import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { UserId } from './entity/properties/UserId';
import { UserUsername } from './entity/properties/UserUsername';
import { UserEntity } from './entity/UserEntity';

export interface IUserRepository {
	getByUsername(username: UserUsername): Promise<Nullable<UserEntity>>;
	delete(user: UserEntity): Promise<UserEntity>;
	update(user: UserEntity): Promise<UserEntity>;
	create(user: UserEntity): Promise<UserEntity>;
	exist(id: UserId): Promise<boolean>;
	getById(id: UserId): Promise<Nullable<UserEntity>>;
}
