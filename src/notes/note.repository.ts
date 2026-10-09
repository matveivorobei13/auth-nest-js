import { Injectable, Inject } from "@nestjs/common";
import { Note, Test } from "./note.types";
import { EditNoteDto } from "./note.dto";
import type { Database } from "../database/database.types";
import { notes, users } from "../database/schema";
import { and, asc, count, eq } from "drizzle-orm";
import { or } from "drizzle-orm";


@Injectable()
export class NoteRepository{
    constructor(@Inject('DRIZZLE_DB')
    private readonly db: Database){}

    async getNotes(user_id: number): Promise<Note[]>{
        const result = await this.db.select().from(notes).where(eq(notes.user_id, user_id))
        return result
    }

    async getNote(note_id: number, user_id: number): Promise<Note>{
        const result = await this.db.select().from(notes).where(and(
            eq(notes.user_id, user_id),
            eq(notes.id, note_id)
        ))
        return result[0]
    }

    async createNote(title: string, content: string, user_id: number): Promise<void> {
        await this.db.insert(notes).values({
            title,
            content,
            user_id
        })
    }

    async deleteNote(note_id: number): Promise<void> {
        await this.db.delete(notes).where(eq(notes.id, note_id))
    }

    async editNote(data: EditNoteDto, note_id: number): Promise<Note>{
        const set: any = {}

        Object.entries(data).forEach(([key, value]) => {
            if(value !== undefined){
                set[key] = value
            }
        });
        const result = await this.db.update(notes).set(set).where(eq(notes.id, note_id)).returning()

        return result[0]
    }

    async testRepository(user_id: number): Promise<Test[]> {
        const resulte = await this.db.select({
            title: notes.title,
            content: notes.content,
            email: users.email
        }).from(users)
        .innerJoin(notes, eq(users.id, notes.user_id))
        .where(eq(users.id, user_id))

        
        return resulte
    }
}