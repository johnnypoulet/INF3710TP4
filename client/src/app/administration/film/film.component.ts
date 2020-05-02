import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../../../../common/tables/film';
import { CommunicationService } from 'src/app/services/serverCommunication/communication.service';
import { Events } from 'src/app/generic-table/generic-table.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ALERTTYPE } from 'src/app/shared/utils';
import { InsertUpdateDeleteMessage } from '../../../../../common/communication/message';
import { ERROR_TYPE } from '../../../../../common/error/errors';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit, OnDestroy {
  displayMode: boolean;
  private routerParamsSubscription: Subscription;

  films: Film[];
  headers: string[];
  filmDisplay: string[][];
  eventsConfig: Events[];

  buttonSubmitText: string;

  filmForm = this.fb.group({
    idfilm: ['-1', [Validators.required]],
    title: ['', [Validators.required]],
    genre: ['Action', Validators.required],
    dateprod: ['', [Validators.required]],
    youtubeid: ['', [Validators.required]],
    duration: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(999)]]
  });
  constructor(private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder, private communicationService: CommunicationService,
    private alertSevice: AlertService) { }

  ngOnInit(): void {
    this.buttonSubmitText = 'Ajouter un film';
    this.films = [];
    this.filmDisplay = [];
    this.headers = ['Titre', 'Genre', 'Année de production', 'Durée', 'Youtube id'];
    this.eventsConfig = [
      Events.ROW,
      Events.EDIT,
      Events.DELETE,
      Events.ADD
    ];
    this.displayMode = true;
    this.routerParamsSubscription = this.route.params.subscribe((params: any) => {
      if (params['id']) {
        this.displayMode = false;
        this.getOneFilms(+params['id']);
      } else {
        this.displayMode = true;
        this.getFilms();
      }
    });


  }

  ngOnDestroy() {
    this.routerParamsSubscription.unsubscribe();
  }
  edit(rowIndex: number): void {
    this.router.navigate(['/admin/film', this.films[rowIndex].idfilm]);
  }

  add(): void {
    this.router.navigate(['/admin/film', -1]);
  }

  delete(rowIndex: number): void {
    this.communicationService.deleteFilm(this.films[rowIndex]).subscribe((result: InsertUpdateDeleteMessage) => {
      if (result.error === ERROR_TYPE.NONE) {
        this.alertSevice.sendAlert("Suppression réussi", ALERTTYPE.SUCCESS, 3000);
        this.showFilm();
      } else {
        this.alertSevice.sendAlert("Suppression non réussi", ALERTTYPE.ERROR, 3000);
      }
    });
  }

  getFilms(): void {
    this.communicationService.getAllFilm().subscribe((films: Film[]) => {

      this.films = films;
      this.filmDisplay = new Array(this.films.length);
      this.films.forEach((film, index) => {
        film.dateprod = film.dateprod.slice(0, 10);
        this.filmDisplay[index] = [];
        this.filmDisplay[index] = [film.title, film.genre, film.dateprod, film.duration.toString(), film.youtubeid];
      })
    })
  }


  getOneFilms(idFilm: number): void {
    if (idFilm != -1) {
      this.buttonSubmitText = 'Modifier le film';
      this.communicationService.getOneFilmById(idFilm).subscribe((film: Film) => {
        film.dateprod = film.dateprod.slice(0, 10);
        this.filmForm.setValue(film);
      });
    } else {
      this.buttonSubmitText = 'Ajouter le film';
    }
  }
  showFilm(): void {
    this.router.navigate(['/admin/film']);
  }

  onSubmitFilm(): void {
    if (this.filmForm.value.idfilm >= 1) {
      this.communicationService.updateFilm(this.filmForm.value).subscribe((result: InsertUpdateDeleteMessage) => {
        if (result.error === ERROR_TYPE.NONE) {
          this.alertSevice.sendAlert("Édition réussi", ALERTTYPE.SUCCESS, 3000);
          this.showFilm();
        } else {
          this.alertSevice.sendAlert("Édition non réussi", ALERTTYPE.ERROR, 3000);
        }
      });
    } else {
      this.communicationService.addFilm(this.filmForm.value).subscribe((result: InsertUpdateDeleteMessage) => {
        if (result.error === ERROR_TYPE.NONE) {
          this.alertSevice.sendAlert("Ajout réussi", ALERTTYPE.SUCCESS, 3000);
          this.showFilm();
        } else {
          this.alertSevice.sendAlert("Ajout non réussi", ALERTTYPE.ERROR, 3000);
        }
      });
    }

  }
}
