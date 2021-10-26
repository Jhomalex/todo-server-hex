import { TasklistRepository } from '@/app/tasklist/dataSources/TasklistRepository';
import { TasklistMemberRepository } from '@/app/tasklistMember/dataSources/TasklistMemberRepository';
import { UserRepository } from '@/app/user/dataSources/UserRepository';
import { SigninInteractor } from './signin/SigninInteractor';
import { SignupInteractor } from './signup/SignupInteractor';

const userRepo = new UserRepository();
const tasklistRepo = new TasklistRepository();
const tasklistMemberRepo = new TasklistMemberRepository();

export const signinInteractor = new SigninInteractor(userRepo);
export const signupInteractor = new SignupInteractor({
	userRepo,
	tasklistRepo,
	tasklistMemberRepo,
});
