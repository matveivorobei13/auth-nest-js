import { Inject, Injectable } from "@nestjs/common";

import { User, UserPublic } from "./user.types";
import type { Database } from "../database/database.types";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
@Injectable()
export class UserRepository{
    constructor(
        @Inject('DRIZZLE_DB')
        private readonly db: Database,
    ) {}

    async getUsers(): Promise<UserPublic[]>{
        const result = await this.db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            created_at: users.created_at
        }).from(users)
        return result
    }

    async getUser(id: number): Promise<UserPublic> {
        const result = await this.db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            created_at: users.created_at
        }).from(users).where(eq(users.id, id))
        return result[0]
    }
}