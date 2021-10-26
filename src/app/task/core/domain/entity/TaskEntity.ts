import { Task, Tasklist } from '.prisma/client';
import { Entity } from '@/app/shared/core/domain/Entity';
import { InvalidException } from '@/app/shared/core/domain/InvalidException';
import { CreatedAt } from '@/app/shared/core/domain/valueObjects/CreatedAt';
import { Nullable } from '@/app/shared/core/domain/valueObjects/Nullable';
import { UpdatedAt } from '@/app/shared/core/domain/valueObjects/UpdatedAt';
import { TasklistId } from '@/app/tasklist/core/domain/entity/properties/TasklistId';
import { TasklistEntity } from '@/app/tasklist/core/domain/entity/TasklistEntity';
import { UserId } from '@/app/user/core/domain/entity/properties/UserId';
import { TaskDescription } from './properties/TaskDescription';
import { TaskFinishedDate } from './properties/TaskFinishedDate';
import { TaskId } from './properties/TaskId';
import { TaskIsFinished } from './properties/TaskIsFinished';
import { TaskName } from './properties/TaskName';

export class TaskEntity extends Entity {
	static create(props: {
		id: TaskId;
		name: TaskName;
		description: TaskDescription;
		isFinished: TaskIsFinished;
		finishedDate: Nullable<TaskFinishedDate>;
		tasklistId: TasklistId;
		createdAt: CreatedAt;
		updatedAt: UpdatedAt;
		tasklist?: TasklistEntity;
	}) {
		return new TaskEntity(
			props.id,
			props.name,
			props.description,
			props.isFinished,
			props.finishedDate,
			props.tasklistId,
			props.createdAt,
			props.updatedAt,
			props.tasklist
		);
	}

	static fromPrimitives(
		props: Task & {
			tasklist?: Tasklist & { tasks?: any[]; tasklistMembers?: any[] };
		}
	): TaskEntity {
		return TaskEntity.create({
			id: new TaskId(props.id),
			name: new TaskName(props.name),
			description: new TaskDescription(props.description),
			isFinished: new TaskIsFinished(props.isFinished),
			finishedDate: props.finishedDate
				? new TaskFinishedDate(props.finishedDate)
				: null,
			tasklistId: new TasklistId(props.tasklistId),
			createdAt: new CreatedAt(props.createdAt),
			updatedAt: new UpdatedAt(props.updatedAt),
			tasklist: props.tasklist
				? TasklistEntity.fromPrimitives(props.tasklist)
				: undefined,
		});
	}

	toPrimitives(): Task & {
		tasklist?: Tasklist & { tasks?: any[]; tasklistMembers?: any[] };
	} {
		return {
			id: this._id.value,
			name: this._name.value,
			description: this._description.value,
			isFinished: this._isFinished.value,
			finishedDate: this.nullable(this._finishedDate?.value),
			tasklistId: this._tasklistId.value,
			createdAt: this._createdAt.value,
			updatedAt: this._updatedAt.value,
			tasklist: this.tasklist?.toPrimitives(),
		};
	}

	isAllowedToBeShowed(userId: UserId) {
		if (!this.tasklist)
			throw new InvalidException(
				'You not have permission to access to this task'
			);
		if (!this.tasklist.tasklistMembers)
			throw new InvalidException(
				'You not have permission to access to this task'
			);
		const isAllowed =
			this.tasklist.tasklistMembers.findIndex(tm =>
				tm.userId.equals(userId)
			) !== -1;

		if (!isAllowed)
			throw new InvalidException(
				'You not have permission to access to this task'
			);
		return this;
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
	get tasklistId(): TasklistId {
		return this._tasklistId;
	}
	set tasklistId(value: TasklistId) {
		this._tasklistId = value;
	}
	get finishedDate(): Nullable<TaskFinishedDate> {
		return this._finishedDate;
	}
	set finishedDate(value: Nullable<TaskFinishedDate>) {
		this._finishedDate = value;
	}
	get isFinished(): TaskIsFinished {
		return this._isFinished;
	}
	set isFinished(value: TaskIsFinished) {
		this._isFinished = value;
	}
	get description(): TaskDescription {
		return this._description;
	}
	set description(value: TaskDescription) {
		this._description = value;
	}
	get name(): TaskName {
		return this._name;
	}
	set name(value: TaskName) {
		this._name = value;
	}
	get id(): TaskId {
		return this._id;
	}
	set id(value: TaskId) {
		this._id = value;
	}
	private constructor(
		private _id: TaskId,
		private _name: TaskName,
		private _description: TaskDescription,
		private _isFinished: TaskIsFinished,
		private _finishedDate: Nullable<TaskFinishedDate>,
		private _tasklistId: TasklistId,
		private _createdAt: CreatedAt,
		private _updatedAt: UpdatedAt,
		readonly tasklist?: TasklistEntity
	) {
		super();
	}
}
