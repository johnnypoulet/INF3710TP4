import { injectable, inject } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Member } from "../../../common/tables/Member";
import Types from "../types";
import { DatabaseService } from "./database.service";
import { EncryptService } from "./encrypt.service";

@injectable()
export class MemberService {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService,
        @inject(Types.EncryptService) private encryptService: EncryptService) {

    }
    public createNewMember(member: Member): Promise<pg.QueryResult> {
        const encryptedPassword = this.encryptService.encrypt(member.password);
        const values: string[] = [
            member.email,
            encryptedPassword,
            member.address.idAddress.toString(),
            member.name,
            member.type
        ];

        const queryText: string = `INSERT INTO polyflixDB.Member VALUES(DEFAULT, $1, $2, $3, $4, $5);`;
        return this.databaseService.pool.query(queryText, values);
    }

    public createNewAdress(member: Member): Promise<pg.QueryResult> {
        const values: string[] = [
            member.address.address,
            member.address.city,
            member.address.pc,
            member.address.province,
            member.address.country,
        ];

        const queryText: string = `INSERT INTO polyflixDB.Address VALUES(DEFAULT, $1, $2, $3, $4, $5);`;
        return this.databaseService.pool.query(queryText, values);
    }

    public getAddressId(member: Member): Promise<pg.QueryResult> {
        const values: string[] = [
            member.address.address,
            member.address.city,
            member.address.pc,
            member.address.province,
            member.address.country,
        ];

        const queryText: string = `SELECT idaddress FROM polyflixDB.Address WHERE
            address = $1 AND city = $2 AND postalCode = $3 AND province = $4
            AND country = $5 `;
        return this.databaseService.pool.query(queryText, values);
    }

    public getMemberByEmail(member: Member): Promise<pg.QueryResult> {
        const values: string[] = [
            member.email
        ];

        const queryText: string = `SELECT * FROM polyflixdb.member where email = $1`;
        return this.databaseService.pool.query(queryText, values);
    }

    public async isEmailUsed(member: Member): Promise<boolean> {
        return this.getMemberByEmail(member).then((result: pg.QueryResult) => {
            if (result.rows.length > 0)
                return true
            else
                return false
        }, (err:any)=>{
            console.log('An error occured : ', err);
            return true;
        })
    }

}
