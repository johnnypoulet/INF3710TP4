import { Component, OnInit, OnDestroy } from '@angular/core';
import { Events } from '../generic-table/generic-table.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../services/serverCommunication/communication.service';
import { Film, FilmInfo, DEFAULTFILMINFO } from '../../../../common/tables/film';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit, OnDestroy {
  eventsConfig: Events[];
  films: Film[];
  filmDisplay: string[][];
  headers: string[];

  currentFilmInfos: FilmInfo;

  watchMode: boolean;
  loading: boolean

  title:string;
  private routerParamsSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute,
    private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.eventsConfig = [
      Events.ROW,
    ];
    this.title = "Liste des films"
    this.films = [];
    this.filmDisplay = [];
    this.headers = ['Titre', 'Genre', 'Année de production', 'Durée'];
    this.currentFilmInfos = DEFAULTFILMINFO;
    this.watchMode = false;
    this.loading = false;
    this.routerParamsSubscription = this.route.params.subscribe((params: any) => {
      if (params['id']) {
        this.title = "Informations"
        this.watchMode = true;
        this.getOneFilms(+params['id']);
      } else {
        this.title = "Liste des films"
        this.watchMode = false;
        this.getFilms();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerParamsSubscription.unsubscribe();
  }


  getFilms(): void {
    this.communicationService.getAllFilm().subscribe((films: Film[]) => {

      this.films = films;
      this.filmDisplay = new Array(this.films.length);
      this.films.forEach((film, index) => {
        film.dateprod = film.dateprod.slice(0, 10);
        this.filmDisplay[index] = [];
        this.filmDisplay[index] = [film.title, film.genre, film.dateprod, film.duration.toString()];
      })
    })
  }

  getOneFilms(idFilm: number): void {
    this.currentFilmInfos = DEFAULTFILMINFO;
    this.loading = true;
    this.communicationService.getInfosFromFilm(idFilm).subscribe((filmInfos: FilmInfo) => {
      filmInfos.film.dateprod = filmInfos.film.dateprod.slice(0, 10);
      this.currentFilmInfos = filmInfos;
      this.loading = false;
    });
  }


  selectFilm(rowIndex: number): void {
    this.router.navigate(['/membre', this.films[rowIndex].idfilm]);
  }

  watchMovie(idFilm:number): void {
    this.router.navigate(['/membre/watchMovie', idFilm]);
  }

  return(): void {
    this.router.navigate(['/membre']);
  }

}
