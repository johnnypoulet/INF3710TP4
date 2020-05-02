import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import Types from "../types";
import * as pg from "pg";
import { FilmService } from "../services/film.service";
import { InsertUpdateDeleteMessage } from "../../../common/communication/message";
import { ERROR_TYPE } from "../../../common/error/errors";
import { FilmInfo, DEFAULTFILMINFO } from "../../../common/tables/Film";

@injectable()
export class FilmController {
    public constructor(@inject(Types.FilmService) private filmService: FilmService) { }

    public get router(): Router {
        const router: Router = Router();
        router.get("/getall",
            (req: Request, res: Response, next: NextFunction) => {
                this.filmService.getall().then((result: pg.QueryResult) => {
                    res.json(result.rows);
                });
            });
        router.put("/create",
            (req: Request, res: Response, next: NextFunction) => {
                this.filmService.addFilm(req.body.film).then((result: pg.QueryResult) => {
                    const response: InsertUpdateDeleteMessage = {
                        isInserted: true,
                        error: ERROR_TYPE.NONE
                    }
                    res.json(response);
                }).catch((e: Error) => {
                    const response: InsertUpdateDeleteMessage = {
                        isInserted: false,
                        error: ERROR_TYPE.UNKNOWN
                    }
                    res.json(response);
                    console.error(e.stack);
                });
            });
        router.post("/update",
            (req: Request, res: Response, next: NextFunction) => {
                this.filmService.update(req.body.film).then((result: pg.QueryResult) => {
                    const response: InsertUpdateDeleteMessage = {
                        isInserted: true,
                        error: ERROR_TYPE.NONE
                    }
                    res.json(response);
                }).catch((e: Error) => {
                    const response: InsertUpdateDeleteMessage = {
                        isInserted: false,
                        error: ERROR_TYPE.UNKNOWN
                    }
                    res.json(response);
                    console.error(e.stack);
                });
            });
        router.delete("/delete/:id",
            (req: Request, res: Response, next: NextFunction) => {
                this.filmService.delete(req.params.id).then((result: pg.QueryResult) => {
                    res.json(result);
                });
            });
        router.get("/getOneById/:id",
            (req: Request, res: Response, next: NextFunction) => {
                this.filmService.getOneById(req.params.id).then((result: pg.QueryResult) => {
                    res.json(result.rows[0]);
                })
            });
        router.get("/getFilmInfos/:id",
            (req: Request, res: Response, next: NextFunction) => {
                let filmInfos: FilmInfo = DEFAULTFILMINFO;
                this.filmService.getOneById(req.params.id).then((result: pg.QueryResult) => {
                    filmInfos.film = result.rows[0];
                    this.filmService.getFilmArtists(req.params.id).then((result: pg.QueryResult) => {
                        const artists: { role: string, name: string }[] = result.rows;
                        filmInfos.Directors = [];
                        filmInfos.Productors = [];
                        filmInfos.Actors = [];
                        filmInfos.PhotoDirectors = [];
                        artists.forEach((artist) => {
                            if (artist.role === "Producteur")
                                filmInfos.Productors.push(artist.name);
                            else if (artist.role === "Réalisateur")
                                filmInfos.Directors.push(artist.name);
                            else if (artist.role === "Acteur")
                                filmInfos.Actors.push(artist.name);
                            else if (artist.role === "Directeur photo")
                                filmInfos.PhotoDirectors.push(artist.name);
                        });

                        this.filmService.getOscarNomination(req.params.id).then((result: pg.QueryResult) => {
                            const nominations: { category: string, date: Date, wontheoscar: boolean }[] = result.rows;
                            filmInfos.OscarNomination.BestMovie.date = [];
                            filmInfos.OscarNomination.BestMovie.won = [];
                            filmInfos.OscarNomination.BestMovie.date = [];
                            filmInfos.OscarNomination.BestMovie.won = [];
                            filmInfos.OscarNomination.BestDirector.date = [];
                            filmInfos.OscarNomination.BestDirector.won = [];
                            nominations.forEach((nomination) => {
                                if (nomination.category === "Meilleur film") {
                                    filmInfos.OscarNomination.BestMovie.won.push(nomination.wontheoscar);
                                    filmInfos.OscarNomination.BestMovie.date.push(nomination.date);
                                }
                                else if (nomination.category === "Meilleur acteur") {
                                    filmInfos.OscarNomination.BestActor.won.push(nomination.wontheoscar);
                                    filmInfos.OscarNomination.BestActor.date.push(nomination.date);
                                }
                                else if (nomination.category === "Meilleur réalisateur") {
                                    filmInfos.OscarNomination.BestDirector.won.push(nomination.wontheoscar);
                                    filmInfos.OscarNomination.BestDirector.date.push(nomination.date);
                                }
                            });
                            res.json(filmInfos);
                        });

                    });
                })
            });

        router.post("/rent/",
            (req: Request, res: Response, next: NextFunction) => {
                this.filmService.rentFilm(req.body.rentalInfo).then((result: pg.QueryResult) => {
                    res.json(result.rows[0]);
                }, (error: any) => {
                    console.log('An error occured : ', error)
                })
            });
        return router;
    }
}
