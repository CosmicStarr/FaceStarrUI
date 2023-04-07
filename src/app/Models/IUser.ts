export interface IUser{
    firstname:string
    lastname:string
    email:string
    password:string
    token?: string;
    rememberMe?: boolean;
    jobDepartment?:string;
    role?:string[];
}