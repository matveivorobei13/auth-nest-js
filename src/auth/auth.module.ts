import { Module } from "@nestjs/common";

import { authRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "../database/database.module";
import { UserModule } from "../users/user.module";
import { SharedModule } from "../shared/shared.module";

@Module({
    imports: [UserModule, DatabaseModule, SharedModule],
    controllers: [AuthController],
    providers: [AuthService, authRepository],
    
})
export class AuthModule{}