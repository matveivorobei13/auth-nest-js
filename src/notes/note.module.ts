import { Module } from "@nestjs/common";

import { NoteController } from "./note.controller";
import { NoteService } from "./note.service";
import { NoteRepository } from "./note.repository";
import { DatabaseModule } from "../database/database.module";
import { SharedModule } from "../shared/shared.module";

@Module({
    imports: [DatabaseModule, SharedModule],
    controllers: [NoteController],
    providers: [NoteService, NoteRepository]
})
export class NoteModule{}