import { Injectable, Inject } from "@nestjs/common";

import { User } from "../users/user.types";
import { RefreshToken } from "./auth.types";
import type { Database } from "../database/database.types";
import { tokens, users } from "../database/schema";
import { eq, or } from "drizzle-orm";

@Injectable()
export class authRepository{
    constructor(
        @Inject('DRIZZLE_DB')
        private readonly db: Database
    ){}

    async createUser(name: string, password: string, email: string): Promise<User> {
        const [result] = await this.db.insert(users).values({
                name,
                password,
                email
            })
            .returning()
        
        return result
    }

    async getUserByNameOrEmail(name: string, email: string): Promise<User[]> {
        const result = await this.db.select().from(users).where(or(eq(users.name, name), eq(users.email, email)))
        return result
    }

    async getUserByName(name: string): Promise<User[]> {
        const result = await this.db.select().from(users).where(eq(users.name, name))
        
        return result
    }
    
    async CreateRefreshToken
        (user_id: number, token: string, expires_at: Date): Promise<RefreshToken>
    {
        const result = await this.db.insert(tokens).values({
            token,
            user_id,
            expires_at
        }).returning()
        
        return result[0]
    }

    async findRefreshToken(token: string): Promise<RefreshToken> {
        const result = await this.db.select().from(tokens).where(eq(tokens.token, token))
        
        return result[0]
    }

    async deleteRefreshToken(id: number): Promise<void> {
        await this.db.delete(tokens).where(eq(tokens.id, id))
        
    }
}
