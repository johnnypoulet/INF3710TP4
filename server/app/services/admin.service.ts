import { injectable, inject } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Admin } from "../../../common/tables/Admin";
import Types from "../types";
import { DatabaseService } from "./database.service";
import { EncryptService } from "./encrypt.service";

@injectable()
export class AdminService {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService,
        @inject(Types.EncryptService) private encryptService: EncryptService) {
    }
    public createNewAdmin(admin: Admin): Promise<pg.QueryResult> {
        const encryptedPassword = this.encryptService.encrypt(admin.password);
        const values: string[] = [
            admin.username,
            encryptedPassword,
            admin.name,
        ];

        const queryText: string = `INSERT INTO polyflixDB.Admin VALUES(DEFAULT, $1, $2, $3);`;
        return this.databaseService.pool.query(queryText, values);
    }

}
