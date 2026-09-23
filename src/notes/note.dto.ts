import { IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class CreateNoteDto{
    @IsString()
    @MinLength(3)
    @MaxLength(55)
    title: string

    @IsString()
    @MinLength(3)
    @MaxLength(10000)
    content: string
}

export class EditNoteDto{
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(55)
    title?: string

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(10000)
    content?: string
}