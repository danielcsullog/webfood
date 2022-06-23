export interface User {
    id: number;
    name: string;
    userName: string;
    password: string;
    role: UserRole;
}

export enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
}