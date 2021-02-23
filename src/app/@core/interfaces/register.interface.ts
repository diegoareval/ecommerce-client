import { IUser } from './user.interface';

export interface IRegisterForm{
    name: string;
    lastname: string;
    email: string;
    password: string;
    birthdate: string;
    role?: string;
    active?: boolean;

}

export interface IResultRegister{
    status: boolean,
    message: string,
    user?: IUser
}