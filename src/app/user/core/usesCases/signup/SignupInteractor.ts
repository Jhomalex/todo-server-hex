import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { CreatedAt } from '@/app/shared/core/domain/valueObjects/CreatedAt';
import { UpdatedAt } from '@/app/shared/core/domain/valueObjects/UpdatedAt';
import { TasklistName } from '@/app/tasklist/core/domain/entity/properties/TasklistName';
import { TasklistCreatorInteractor } from '@/app/tasklist/core/domain/interactors/TasklistCreatorInteractor';
import { ITasklistRepository } from '@/app/tasklist/core/domain/ITasklistRepository';
import { TasklistMemberCreatorInteractor } from '@/app/tasklistMember/core/domain/interactors/TasklistMemberCreatorInteractor';
import { ITasklistMemberRepository } from '@/app/tasklistMember/core/domain/ITasklistMemberRepository';
import { UserAvatar } from '../../domain/entity/properties/UserAvatar';
import { UserGoogleId } from '../../domain/entity/properties/UserGoogleId';
import { UserId } from '../../domain/entity/properties/UserId';
import { UserName } from '../../domain/entity/properties/UserName';
import { UserPassword } from '../../domain/entity/properties/UserPassword';
import { UserUsername } from '../../domain/entity/properties/UserUsername';
import { UserEntity } from '../../domain/entity/UserEntity';
import { IUserRepository } from '../../domain/IUserRepository';

export class SignupInteractor {
	private tasklistCreator;
	private tasklistMemberCreator;
	constructor(
		private props: {
			userRepo: IUserRepository;
			tasklistRepo: ITasklistRepository;
			tasklistMemberRepo: ITasklistMemberRepository;
		}
	) {
		this.tasklistCreator = new TasklistCreatorInteractor(props.tasklistRepo);
		this.tasklistMemberCreator = new TasklistMemberCreatorInteractor({
			tasklistMemberRepo: props.tasklistMemberRepo,
			tasklistRepo: props.tasklistRepo,
			userRepo: props.userRepo,
		});
	}

	async run(params: {
		name: UserName;
		username: UserUsername;
		password: UserPassword;
		googleId?: UserGoogleId;
	}): Promise<UserEntity> {
		const exist = await this.props.userRepo.getByUsername(params.username);
		if (exist) throw new InvalidException('This username already exist');

		const encryptedPass = await UserEntity.encryptPassword(params.password);

		let user = UserEntity.create({
			id: UserId.random(),
			name: params.name,
			username: params.username,
			password: new UserPassword(encryptedPass),
			avatar: new UserAvatar('user.png'),
			googleId: params.googleId ? params.googleId : null,
			createdAt: CreatedAt.now(),
			updatedAt: UpdatedAt.now(),
		});

		user = await this.props.userRepo.create(user);

		const tasklist = await this.tasklistCreator.run(
			new TasklistName('My tasks')
		);

		await this.tasklistMemberCreator.run({
			userId: user.id,
			tasklistId: tasklist.id,
			userLoggedId: user.id,
		});

		return user;
	}
}
