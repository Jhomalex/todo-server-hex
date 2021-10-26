import { TasklistMember, User } from '.prisma/client';
import { Entity } from '@/app/shared/core/domain/Entity';
import { CreatedAt } from '@/app/shared/core/domain/valueObjects/CreatedAt';
import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { UpdatedAt } from '@/app/shared/core/domain/valueObjects/UpdatedAt';
import { TasklistMemberEntity } from '@/app/tasklistMember/core/domain/entity/TasklistMemberEntity';
import { compare, genSalt, hash } from 'bcrypt';
import { UserGoogleId } from './properties/UserGoogleId';
import { UserId } from './properties/UserId';
import { UserName } from './properties/UserName';
import { UserPassword } from './properties/UserPassword';
import { UserUsername } from './properties/UserUsername';
import { sign } from 'jsonwebtoken';
import { env } from '@/config/env';
import { UserAvatar } from './properties/UserAvatar';

export class UserEntity extends Entity {
	static create(props: {
		id: UserId;
		name: UserName;
		username: UserUsername;
		password: UserPassword;
		googleId: Nullable<UserGoogleId>;
		avatar: UserAvatar;
		createdAt: CreatedAt;
		updatedAt: UpdatedAt;
		tasklistMembers?: TasklistMemberEntity[];
	}) {
		return new UserEntity(
			props.id,
			props.name,
			props.username,
			props.password,
			props.googleId,
			props.avatar,
			props.createdAt,
			props.updatedAt,
			props.tasklistMembers
		);
	}

	static fromPrimitives(
		props: User & {
			tasklistMembers?: (TasklistMember & { user?: any; tasklist?: any })[];
		}
	): UserEntity {
		return UserEntity.create({
			id: new UserId(props.id),
			name: new UserName(props.name),
			username: new UserUsername(props.username),
			password: new UserPassword(props.password),
			googleId: props.googleId ? new UserGoogleId(props.googleId) : null,
			avatar: new UserAvatar(props.avatar),
			createdAt: new CreatedAt(props.createdAt),
			updatedAt: new UpdatedAt(props.updatedAt),
			tasklistMembers: props.tasklistMembers?.map(tlm =>
				TasklistMemberEntity.fromPrimitives(tlm)
			),
		});
	}

	toPrimitives(): User & {
		tasklistMembers?: (TasklistMember & { user?: any; tasklist?: any })[];
	} {
		return {
			id: this._id.value,
			name: this._name.value,
			username: this._username.value,
			password: this._password.value,
			googleId: this.nullable(this._googleId?.value),
			avatar: this._avatar.value,
			createdAt: this._createdAt.value,
			updatedAt: this._updatedAt.value,
			tasklistMembers: this.tasklistMembers?.map(tlm => tlm.toPrimitives()),
		};
	}

	/**
	 * Verify if the password passed as param match with the user password
	 * @param passwordToValidate {string} password to be compared
	 */
	async validatePassword(passwordToValidate: UserPassword): Promise<boolean> {
		return await compare(passwordToValidate.value, this._password.value);
	}

	/**
	 * Generate a JWToken for the user that expires in 30 days.
	 * @param expiration {string} Change the expiration date. Expressed in seconds or a string describing a time span, ex: 1h, 2d, etc.
	 */
	jwtgen(expiration = '30d'): string {
		return sign({ username: this._username.value }, env.jwt.secretKey, {
			expiresIn: expiration,
		});
	}

	static async encryptPassword(password: UserPassword) {
		const salt = await genSalt(10);
		return await hash(password.value, salt);
	}

	get updatedAt(): UpdatedAt {
		return this._updatedAt;
	}
	set updatedAt(value: UpdatedAt) {
		this._updatedAt = value;
	}
	get createdAt(): CreatedAt {
		return this._createdAt;
	}
	set createdAt(value: CreatedAt) {
		this._createdAt = value;
	}
	public get avatar(): UserAvatar {
		return this._avatar;
	}
	public set avatar(value: UserAvatar) {
		this._avatar = value;
	}
	get googleId(): Nullable<UserGoogleId> {
		return this._googleId;
	}
	set googleId(value: Nullable<UserGoogleId>) {
		this._googleId = value;
	}
	get password(): UserPassword {
		return this._password;
	}
	set password(value: UserPassword) {
		this._password = value;
	}
	get username(): UserUsername {
		return this._username;
	}
	set username(value: UserUsername) {
		this._username = value;
	}
	get name(): UserName {
		return this._name;
	}
	set name(value: UserName) {
		this._name = value;
	}
	get id(): UserId {
		return this._id;
	}
	set id(value: UserId) {
		this._id = value;
	}

	private constructor(
		private _id: UserId,
		private _name: UserName,
		private _username: UserUsername,
		private _password: UserPassword,
		private _googleId: Nullable<UserGoogleId>,
		private _avatar: UserAvatar,
		private _createdAt: CreatedAt,
		private _updatedAt: UpdatedAt,
		readonly tasklistMembers?: TasklistMemberEntity[]
	) {
		super();
	}
}
