export interface IUser{
    email:string
    password:string
    token?: string;
    rememberMe?: boolean;
    jobDepartment?:string;
    role?:string[];
}