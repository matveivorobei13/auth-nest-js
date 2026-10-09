import { Module } from "@nestjs/common";
import { databaseProvider } from "./database.provider";

@Module({
    providers: [databaseProvider],
    exports: ["DRIZZLE_DB"]
})
export class DatabaseModule{}