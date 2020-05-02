import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
// import * as pg from "pg";
import { Member, DEFAULTMEMBER } from "../../../common/tables/Member";
import Types from "../types";
import { AuthentificationService } from "../services/authentification.service";
import { AuthentificationMemberMessage, AuthentificationAdminMessage } from "../../../common/communication/message";
import { Admin } from "../../../common/tables/Admin";

@injectable()
export class AuthentificationController {
    public constructor(@inject(Types.AuthentificationService) private authentificationService: AuthentificationService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/member",
            (req: Request, res: Response, next: NextFunction) => {
                let member: Member = DEFAULTMEMBER;
                member.email= req.body.email,
                member.password = req.body.password,
                this.authentificationService.authentificateMember(member).then((result: AuthentificationMemberMessage) => {
                    res.json(result);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/admin",
            (req: Request, res: Response, next: NextFunction) => {
                const admin: Admin = {
                    idAdmin: -1,
                    username: req.body.username,
                    password: req.body.password,
                    name: "",
                }
                this.authentificationService.adminLogin(admin).then((result: AuthentificationAdminMessage) => {
                    res.json(result);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
        return router;
    }
}
