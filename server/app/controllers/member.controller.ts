import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Member, DEFAULTMEMBER } from "../../../common/tables/Member";
import Types from "../types";
import { MemberService } from "../services/member.service";
import * as pg from "pg";
import { InsertUpdateDeleteMessage } from "../../../common/communication/message";
import { ERROR_TYPE } from "../../../common/error/errors";

@injectable()
export class MemberController {
    public constructor(@inject(Types.MemberService) private memberService: MemberService) { }

    public get router(): Router {
        const router: Router = Router();

        router.put("/create",
            (req: Request, res: Response, next: NextFunction) => {
                if (!req.body.email || !req.body.password || !req.body.name || !req.body.type) {
                    const response: InsertUpdateDeleteMessage = {
                        isInserted: false,
                        error: ERROR_TYPE.MISSING_FIELDS
                    }
                    res.json(response);
                } else {
                    let member: Member = DEFAULTMEMBER;
                    member.email = req.body.email;
                    member.password = req.body.password;
                    member.name = req.body.name;
                    member.type = req.body.type;
                    this.memberService.isEmailUsed(member).then((isUsed: boolean) => {
                        if (!isUsed) {
                            if (req.body.address.idAddress && req.body.address.idAddress != -1) {

                                member.address.idAddress = req.body.idAddress;
                                this.memberService.createNewMember(member).then((result: pg.QueryResult) => {
                                    const response: InsertUpdateDeleteMessage = {
                                        isInserted: true,
                                        error: ERROR_TYPE.NONE
                                    }
                                    res.json(response);
                                }).catch((e: Error) => {
                                    const response: InsertUpdateDeleteMessage = {
                                        isInserted: false,
                                        error: ERROR_TYPE.BASIC
                                    }
                                    res.json(response);
                                    console.error(e.stack);
                                })
                            } else { // need to create address before
                                if (!req.body.address.address || !req.body.address.city || !req.body.address.pc || !req.body.address.province || !req.body.address.country) {
                                    const response: InsertUpdateDeleteMessage = {
                                        isInserted: false,
                                        error: ERROR_TYPE.MISSING_FIELDS
                                    }
                                    res.json(response);
                                } else {

                                    member.address.idAddress = req.body.address.idAddress;
                                    member.address.address = req.body.address.address;
                                    member.address.city = req.body.address.city;
                                    member.address.pc = req.body.address.pc;
                                    member.address.province = req.body.address.province;
                                    member.address.country = req.body.address.country;
                                    this.memberService.createNewAdress(member).then((result: pg.QueryResult) => {
                                        this.memberService.getAddressId(member).then((resultAddress: pg.QueryResult) => {
                                            member.address.idAddress = resultAddress.rows[0].idaddress;
                                            this.memberService.createNewMember(member).then((resultMember: pg.QueryResult) => {
                                                const response: InsertUpdateDeleteMessage = {
                                                    isInserted: true,
                                                    error: ERROR_TYPE.NONE
                                                }
                                                res.json(response);
                                            }).catch((e: Error) => {
                                                const response: InsertUpdateDeleteMessage = {
                                                    isInserted: false,
                                                    error: ERROR_TYPE.BASIC
                                                }
                                                res.json(response);
                                                console.error(e.stack);
                                            })
                                        });
                                    })
                                }


                            }
                        } else {
                            const response: InsertUpdateDeleteMessage = {
                                isInserted: false,
                                error: ERROR_TYPE.ALLREADY_EXISTS
                            }
                            res.json(response);
                        }
                    });


                };
            });

        return router;
    }
}
