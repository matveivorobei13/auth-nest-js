import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { NoteRepository } from "./note.repository";
import { CreateNoteDto, EditNoteDto } from "./note.dto";
import { Note, Test } from "./note.types";


@Injectable()
export class NoteService{
    constructor(
        private readonly noteRepository: NoteRepository
    ){}

    async getNotes(user_id: number): Promise<Note[]>{
        const notes = await this.noteRepository.getNotes(user_id)
        return notes
    }

    async getNote(user_id:  number, note_id:  number): Promise<Note> {
        const note = await this.noteRepository.getNote(note_id, user_id)

        if(!note) throw new NotFoundException("note not found")
        return note
    }

    async createNote(data: CreateNoteDto, user_id: number): Promise<void> {
        await this.noteRepository.createNote(data.title, data.content, user_id)
    }

    async deleteNote(note_id: number, user_id: number): Promise<void> {
        const note = await this.noteRepository.getNote(note_id, user_id)
        if(!note) throw new NotFoundException("note not found")
        await this.noteRepository.deleteNote(note_id)
    }

    async editNote(data: EditNoteDto, note_id: number, user_id: number): Promise<Note> {
        
        if (Object.values(data).every(value => value === undefined)) {
            throw new BadRequestException('At least one field is required');
        }

        const note = await this.noteRepository.getNote(note_id, user_id)
        if(!note) throw new NotFoundException("note not found")
        
        const newNote = await this.noteRepository.editNote(data, note_id)

        return newNote
    }
    async test(user_id: number): Promise<Test[]>{
        const notes = await this.noteRepository.testRepository(user_id)

        return notes
    }
}