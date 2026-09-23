import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { NoteService } from "./note.service";
import { AuthGuard } from "../shared/guards/auth.guards";
import type{ Request } from "express";
import { CreateNoteDto, EditNoteDto } from "./note.dto";

@Controller("notes")
export class NoteController{
    constructor(private readonly noteService: NoteService){}

    @Get()
    @UseGuards(AuthGuard)
    async getNotes(@Req() req: Request) {
        const notes = await this.noteService.getNotes(req.user.id)
        return {status: "ok", notes: notes}
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    async getNote(@Param("id", ParseIntPipe) id: string | number, @Req() req: Request){
        const note = await this.noteService.getNote(req.user.id, id)
        return {status: "ok", note: note}
    }

    @Post()
    @UseGuards(AuthGuard)
    async CreateNote(@Body() data: CreateNoteDto, @Req() req: Request){
        await this.noteService.createNote(data, req.user.id)
        return {status: "ok", message: "note created"}
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async DeleteNote(@Req() req: Request, @Param("id", ParseIntPipe) id: string | number){
        await this.noteService.deleteNote(id, req.user.id)
        return {status: "ok", message: "note deleted"}
    }

    @Patch(":id")
    @UseGuards(AuthGuard)
    async editNote(@Req() req: Request, @Param("id", ParseIntPipe) id: string | number, @Body() data: EditNoteDto){
        const note = await this.noteService.editNote(data, id, req.user.id)
        return {status: "ok", note: note}
    }
}