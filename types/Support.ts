export interface IChatInfo {
    
}

export interface IMessages {
   user: IUser
}

export interface IUser {
    id: string,
    phone: string,
    fristName: string,
    lastName: string,
    email: string,
    avatarUrl: string
}