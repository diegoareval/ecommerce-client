import { IUser } from './user.interface';

export interface ISession{
    expiresIn: string,
    token?: string
}

export interface IMedata{
    status: true,
    message: string,
    user?: IUser
}