import { UserEntity } from '@/app/user/core/domain/entity/UserEntity';
import { Request, Response } from 'express';

export type Context = {
	request: Request;
	ressponse: Response;
	user: UserEntity;
};
