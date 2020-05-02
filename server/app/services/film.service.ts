import { injectable, inject } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Film, RentalInfo } from "../../../common/tables/Film";
import Types from "../types";
import { DatabaseService } from "./database.service";

@injectable()
export class FilmService {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) {

    }
    public addFilm(film: Film): Promise<pg.QueryResult> {
        const values: string[] = [
            film.title,
            film.dateprod.toString(),
            film.duration.toString(),
            film.genre,
            film.youtubeid
        ];

        const queryText: string = `INSERT INTO polyflixDB.Film VALUES(DEFAULT, $1, $2, $3, $4, $5);`;
        return this.databaseService.pool.query(queryText, values);
    }

    public update(film: Film): Promise<pg.QueryResult> {
        const values: string[] = [
            film.idfilm.toString(),
            film.title,
            film.dateprod.toString(),
            film.duration.toString(),
            film.genre,
            film.youtubeid
        ];

        const queryText: string = `UPDATE polyflixDB.film SET
        title =$2, dateProd = $3, duration =$4, genre = $5, youtubeid = $6
        WHERE idFilm = $1;`;
        return this.databaseService.pool.query(queryText, values);
    }

    public delete(idFilm: string): Promise<pg.QueryResult> {
        const values: string[] = [
            idFilm
        ];
        const queryText: string = `DELETE FROM polyflixDB.film
        WHERE idFilm = $1;`;
        return this.databaseService.pool.query(queryText, values);
    }

    public getall(): Promise<pg.QueryResult> {
        const queryText: string = `SELECT * FROM polyflixDB.film;`;
        return this.databaseService.pool.query(queryText);
    }

    public getOneById(idFilm: string): Promise<pg.QueryResult> {
        const values: string[] = [
            idFilm
        ];
        const queryText: string = `SELECT * FROM polyflixDB.film WHERE idFilm = $1;`;
        return this.databaseService.pool.query(queryText, values);
    }

    public getFilmArtists(idFilm: string): Promise<pg.QueryResult> {
        const values: string[] = [
            idFilm
        ];
        const queryText: string = `SELECT  a.name, r.role FROM polyflixdb.roleartistfilm raf
        INNER JOIN polyflixdb.artist a on a.idArtist = raf.idArtist
        INNER JOIN polyflixdb.role r on r.idrole = raf.idRole
        WHERE raf.idfilm = $1`;
        return this.databaseService.pool.query(queryText, values);
    }

    public getOscarNomination(idFilm: string): Promise<pg.QueryResult> {
        const values: string[] = [
            idFilm
        ];
        const queryText: string = `select o_a.category, o_c.date, o_n.wontheoscar from polyflixdb.oscarnomination o_n
        INNER JOIN polyflixdb.oscarcategory o_a on o_a.idCategory = o_n.idCategory
        INNER JOIN polyflixdb.oscarCeremony o_c on o_c.idCeremony = o_n.idCeremony
        WHERE o_n.idfilm = $1
        order by o_c.date`;
        return this.databaseService.pool.query(queryText, values);
    }


    public rentFilm(rentalInfo: RentalInfo): Promise<pg.QueryResult> {
        if (rentalInfo.idrental === -1) {
            return this.getRentalInfo(rentalInfo).then((result: pg.QueryResult) => {
                if (result.rowCount > 0) {
                   rentalInfo = result.rows[0];
                    return this.updateRentalFilm(rentalInfo).then(() => {
                        return this.getRentalInfo(rentalInfo);
                    })
                } else {
                    return this.createRental(rentalInfo).then((result: pg.QueryResult) => {
                        return this.getRentalInfo(rentalInfo);
                    })
                }
            })
        } else {
            return this.updateRentalFilm(rentalInfo).then((result: pg.QueryResult) => {
                return this.getRentalInfo(rentalInfo);
            }, (error) => {
                return this.getRentalInfo(rentalInfo);
            })
        }
    }

    private createRental(rentalInfo: RentalInfo): Promise<pg.QueryResult> {
        const values: string[] = [
            rentalInfo.idcreditcard ? rentalInfo.idcreditcard.toString() : '1',
            rentalInfo.idfilm.toString(),
            new Date().toISOString().slice(0, 10),
            rentalInfo.idmember.toString(),
            '0',
            '1',
        ];
        const queryText: string = `INSERT INTO polyflixdb.onlinerental VALUES(DEFAULT, $1, $2, $3, $4, $5, $6);`;
        return this.databaseService.pool.query(queryText, values);
    }

    private getRentalInfo(rentalInfo: RentalInfo): Promise<pg.QueryResult> {
        if (rentalInfo.idrental != -1) {
            const values: string[] = [
                rentalInfo.idrental.toString()
            ];
            const queryText: string = `SELECT * FROM polyflixdb.onlinerental 
            WHERE idRental = $1;`;
            return this.databaseService.pool.query(queryText, values);
        } else {
            const values: string[] = [
                rentalInfo.idfilm.toString(),
                rentalInfo.idmember.toString(),
            ];
            const queryText: string = `SELECT * FROM polyflixdb.onlinerental 
            WHERE idfilm = $1 and idmember = $2;`;
            return this.databaseService.pool.query(queryText, values);
        }
    }

    private updateRentalFilm(rentalInfo: RentalInfo): Promise<pg.QueryResult> {
        if (rentalInfo.currenttime === 0) { // si il est a zéroo c'est une nouvelle écoute
            rentalInfo.watchcount = rentalInfo.watchcount + 1;
        }
        if (rentalInfo.currenttime === -1) { // -1 représente une fin de lecture donc on recommence à 0
            rentalInfo.currenttime = 0;
        }
        const values: string[] = [
            new Date().toISOString().slice(0, 10),
            rentalInfo.currenttime.toString(),
            rentalInfo.watchcount.toString(),
            rentalInfo.idrental.toString(),
        ];
        const queryText: string = `UPDATE polyflixdb.onlinerental SET rentaldate = $1, currenttime = $2, watchcount = $3
            WHERE idrental = $4;`;

        return this.databaseService.pool.query(queryText, values);
    }
}
