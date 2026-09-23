export interface User {
    id: number | string,
    name: string,
    email: string,
    password: string
    created_at: Date
}

export type UserPublic = Omit<User, "password">

export interface UserPayload {
    id: number | string
}