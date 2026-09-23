import { Injectable, Inject } from "@nestjs/common";
import { Pool } from "pg";
import { Note } from "./note.types";
import { EditNoteDto } from "./note.dto";

@Injectable()
export class NoteRepository{
    constructor(@Inject('PG_POOL')
    private readonly pool: Pool){}

    async getNotes(user_id: string | number): Promise<Note[]>{
        const notes = await this.pool.query<Note>(`SELECT * FROM notes WHERE user_id = $1`, [user_id])
        return notes.rows
    }

    async getNote(note_id: number | string, user_id: string | number): Promise<Note>{
        const note = await this.pool.query<Note>(`SELECT * FROM notes
            WHERE user_id = $1 AND id = $2`, [user_id, note_id])

        return note.rows[0]
    }

    async createNote(title: string, content: string, user_id: number | string): Promise<void> {
        await this.pool.query(`INSERT INTO notes (title, content, user_id)
            VALUES($1, $2, $3)`, [title, content, user_id])
    }

    async deleteNote(note_id: number | string): Promise<void> {
        await this.pool.query(`DELETE FROM notes WHERE id = $1`, [note_id])
    }

    async editNote(data: EditNoteDto, note_id: number | string): Promise<Note>{
        const values: unknown[] = [note_id]
        const keys: string[] = []

        Object.entries(data).forEach(([key, value]) => {
            if(value){
                keys.push(`${key} = $${values.length + 1}`);
                values.push(value);
            }
        });

        const query = `UPDATE notes SET ${keys.join(",")} WHERE id = $1 RETURNING *`

        const newNote = await this.pool.query<Note>(query, values)
        return newNote.rows[0]
    }
}