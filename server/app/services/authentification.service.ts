import { injectable, inject } from "inversify";
import * as pg from "pg";
import { PrivateKey, CryptoAlogrithm } from "../secret"
import "reflect-metadata";
import { AuthentificationMemberMessage, AuthentificationAdminMessage } from "../../../common/communication/message";
import { Member, DEFAULTMEMBER } from "../../../common/tables/Member";
import { DatabaseService } from "./database.service";
import Types from "../types";
import { Admin } from "../../../common/tables/Admin";
import { EncryptService } from "./encrypt.service";

@injectable()
export class AuthentificationService {
    key: Buffer;
    alogrithm: string;
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService, @inject(Types.EncryptService) private encryptService: EncryptService) {

        this.alogrithm = CryptoAlogrithm;
        this.key = Buffer.from(PrivateKey, 'hex');
    }

    public authentificateMember(member: Member): Promise<AuthentificationMemberMessage> {
        let authMessage: AuthentificationMemberMessage = {
            isValid: false,
            message: "",
            member: member,
            token: ""
        }
        return this.databaseService.pool.query(`SELECT * FROM POLYFLIXDB.Member WHERE email = '${member.email}'`).then((result: pg.QueryResult) => {
            if (result.rowCount == 1 && this.isSamePassword(member.password, result.rows[0].password)) {
                authMessage.member.idMember = result.rows[0].idmember;
                authMessage.member.email = result.rows[0].email;
                authMessage.member.password = "";
                authMessage.member.type = result.rows[0].subtype;
                authMessage.isValid = true;
                authMessage.message = "Login successful";
                authMessage.token = "";

            } else {
                authMessage.member = DEFAULTMEMBER;
                authMessage.isValid = false;
                authMessage.message = "Credentials aren't correct";
                authMessage.token = "";
            }
            return authMessage;
        }).catch((e: Error) => {
            console.error(e.stack);
            authMessage.member = DEFAULTMEMBER;
            authMessage.isValid = false;
            authMessage.message = e.stack as string;
            authMessage.token = "";
            return authMessage;
        });;
    }


    public adminLogin(admin: Admin): Promise<AuthentificationAdminMessage> {
        let authMessage: AuthentificationAdminMessage = {
            isValid: false,
            message: "",
            admin: admin,
            token: ""
        }
        return this.databaseService.pool.query(`SELECT * FROM POLYFLIXDB.Admin WHERE username = '${admin.username}'`).then((result: pg.QueryResult) => {
            if (result.rowCount == 1 && this.isSamePassword(admin.password, result.rows[0].password)) {
                authMessage.admin.idAdmin = result.rows[0].idadmin;
                authMessage.admin.username = result.rows[0].username;
                authMessage.admin.password = "";
                authMessage.admin.name = result.rows[0].name;
                authMessage.isValid = true;
                authMessage.message = "Login successful";
                authMessage.token = "";

            } else {
                authMessage.admin.idAdmin = -1;
                authMessage.admin.username = "";
                authMessage.admin.password = "";
                authMessage.admin.name = "";
                authMessage.isValid = false;
                authMessage.message = "Credentials aren't correct";
                authMessage.token = "";
            }
            return authMessage;
        }).catch((e: Error) => {
            console.error(e.stack);
            authMessage.admin.idAdmin = -1;
            authMessage.admin.username = "";
            authMessage.admin.password = "";
            authMessage.admin.name = "";
            authMessage.isValid = false;
            authMessage.message = e.stack as string;
            authMessage.token = "";
            return authMessage;
        });;
    }

    private isSamePassword(nonEncryptedPassword: string, encryptedPassword: string) {
        return nonEncryptedPassword === this.encryptService.decrypt(encryptedPassword.toString());
    }

}
