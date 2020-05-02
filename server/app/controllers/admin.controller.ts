import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Admin } from "../../../common/tables/Admin";
import Types from "../types";
import { AdminService } from "../services/admin.service";
import { InsertUpdateDeleteMessage } from "../../../common/communication/message";
import { ERROR_TYPE } from "../../../common/error/errors";
import * as pg from "pg";

@injectable()
export class AdminController {
    public constructor(@inject(Types.AdminService) private adminService: AdminService) { }

    public get router(): Router {
        const router: Router = Router();

        router.put("/create",
            (req: Request, res: Response, next: NextFunction) => {
                if (!req.body.username || !req.body.password || !req.body.name) {
                    const response: InsertUpdateDeleteMessage = {
                        isInserted: false,
                        error: ERROR_TYPE.MISSING_FIELDS
                    }
                    res.json(response);
                } else {
                    const admin: Admin = {
                        idAdmin: -1,
                        username: req.body.username,
                        password: req.body.password,
                        name: req.body.name,
                    }
                    this.adminService.createNewAdmin(admin).then((result: pg.QueryResult) => {
                        if (result.command === "INSERT") {
                            const response: InsertUpdateDeleteMessage = {
                                isInserted: true,
                                error: ERROR_TYPE.NONE
                            }
                            res.json(response);
                        } else{
                            const response: InsertUpdateDeleteMessage = {
                                isInserted: false,
                                error: ERROR_TYPE.UNKNOWN
                            }
                            res.json(response);
                        }
                    }).catch((e: Error) => {
                        const response: InsertUpdateDeleteMessage = {
                            isInserted: false,
                            error: ERROR_TYPE.BASIC
                        }
                        res.json(response);
                        console.error(e.stack);
                    })
                };
            });
        return router;
    }
}
