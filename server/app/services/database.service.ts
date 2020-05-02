import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
// import { Room } from "../../../common/tables/Room";
import {schema} from "../sql/createSchema";
import {data} from "../sql/populateDB";

@injectable()
export class DatabaseService {
    public connectionConfig: pg.ConnectionConfig = {
        user: "sysadmin",
        database: "polyflixDB",
        password: "polyflix1234",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    public pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public constructor() {
        this.pool.connect();
    }

    public createSchema(): Promise<pg.QueryResult> {
        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {
        return this.pool.query(data);
    }
    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT * FROM polyflixDB.${tableName};`);
    }
}
