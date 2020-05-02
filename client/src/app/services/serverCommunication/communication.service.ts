import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthentificationMemberMessage, AuthentificationAdminMessage, InsertUpdateDeleteMessage } from "../../../../../common/communication/message";
// tslint:disable-next-line:ordered-imports
import { of, Observable, concat } from "rxjs";
import { catchError } from "rxjs/operators";
import { Member } from "../../../../../common/tables/Member";
import { Film, FilmInfo, RentalInfo } from "../../../../../common/tables/film";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000";
    public constructor(private http: HttpClient) { }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/database/createSchema", []),
            this.http.post<any>(this.BASE_URL + "/database/populateDb", []));
    }

    public getTableData(tableName: string) {
        return this.http.get<any[]>(this.BASE_URL + "/database/tables/" + tableName).pipe(
            catchError(this.handleError<any[]>("tables")),
        );
    }

    public createMember(member: Member) {
        return this.http.put<InsertUpdateDeleteMessage>(this.BASE_URL + "/member/create/", member).pipe(
            catchError(this.handleError<any>("CreateMember")),
        );
    }

    public memberLogin(member: any) {
        return this.http.post<AuthentificationMemberMessage>(this.BASE_URL + "/authentificate/member/", member).pipe(
            catchError(this.handleError<AuthentificationMemberMessage>("authentificationMember")),
        );
    }
    public adminLogin(admin: any) {
        return this.http.post<AuthentificationAdminMessage>(this.BASE_URL + "/authentificate/admin/", admin).pipe(
            catchError(this.handleError<AuthentificationAdminMessage>("authentificationAdmin")),
        );
    }

    public getAllFilm() {
        return this.http.get<Film[]>(this.BASE_URL + "/film/getAll/").pipe(
            catchError(this.handleError<Film[]>("getAllFilms")),
        );
    }
    public getOneFilmById(idFilm: number) {
        return this.http.get<Film>(this.BASE_URL + `/film/getOneById/${idFilm}`).pipe(
            catchError(this.handleError<Film>("get One film")),
        );
    }
    public getInfosFromFilm(idFilm: number) {
        return this.http.get<FilmInfo>(this.BASE_URL + `/film/getFilmInfos/${idFilm}`).pipe(
            catchError(this.handleError<FilmInfo>("get film info")),
        );
    }



    public deleteFilm(film: Film) {
        return this.http.delete<InsertUpdateDeleteMessage>(this.BASE_URL + `/film/delete/${film.idfilm}`).pipe(
            catchError(this.handleError<InsertUpdateDeleteMessage>("getAllFilms")),
        );
    }

    public addFilm(film: Film) {
        return this.http.put<InsertUpdateDeleteMessage>(this.BASE_URL + "/film/create/", { film: film }).pipe(
            catchError(this.handleError<InsertUpdateDeleteMessage>("createFilm")),
        );
    }
    public updateFilm(film: Film) {
        return this.http.post<InsertUpdateDeleteMessage>(this.BASE_URL + "/film/update/", { film: film }).pipe(
            catchError(this.handleError<InsertUpdateDeleteMessage>("createFilm")),
        );
    }

    public rentFilm(rentalInfo: RentalInfo) {
        return this.http.post<RentalInfo>(this.BASE_URL + "/film/rent/", { rentalInfo: rentalInfo }).pipe(
            catchError(this.handleError<RentalInfo>("rentFIlm")),
        );
    }
    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
