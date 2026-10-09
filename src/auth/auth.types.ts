import { User } from "../users/user.types"

export interface RefreshToken {
    id: number,
    token: string,
    user_id: number,
    created_at: Date,
    expires_at: Date
}

export type Register = {
    user: Omit<User, "password">,
    access: string,
    refresh: string,
}
