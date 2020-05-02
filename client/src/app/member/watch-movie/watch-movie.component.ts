import { Component, OnInit, OnDestroy } from '@angular/core';
import { Film, RentalInfo } from '../../../../../common/tables/film';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunicationService } from 'src/app/services/serverCommunication/communication.service';
import { AuthentificationService } from 'src/app/services/authentification/authentification.service';

@Component({
  selector: 'app-watch-movie',
  templateUrl: './watch-movie.component.html',
  styleUrls: ['./watch-movie.component.css']
})
export class WatchMovieComponent implements OnInit, OnDestroy {


  private routerParamsSubscription: Subscription;
  film: Film;
  loading: boolean;
  player: any;
  rental: RentalInfo;
  ending:boolean
  playing: boolean;
  timer: any;
  constructor(private router: Router, private route: ActivatedRoute,
    private communicationService: CommunicationService,
    private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    this.rental = {
      idrental: -1,
      idfilm: -1,
      idmember: -1,
      currenttime: 0,
      watchcount: 0,
      rentaldate: new Date(),
      idcreditcard: 1
    }
    this.ending = false;
    this.playing = false;
    this.timer =  setInterval(() => { // tous les 30 secondes on va save le current time
      if (this.playing && !this.ending) {
        this.updateCurrentTime(this.cleanTime())
      }
    }, 30000);
    this.loading = false;
    this.routerParamsSubscription = this.route.params.subscribe((params: any) => {
      if (params['id']) {
        this.getOneFilms(+params['id']);
      }
    });

    this.initIframe();
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.routerParamsSubscription.unsubscribe();
  }


  getOneFilms(idFilm: number): void {
    this.loading = true;
    this.communicationService.getOneFilmById(idFilm).subscribe((film: Film) => {
      this.film = film;
      this.rental.idfilm = this.film.idfilm;
      this.rental.idmember = this.authentificationService.getCurrentMember().idMember;
      this.communicationService.rentFilm(this.rental).subscribe((rentalinfo: RentalInfo) => {
        this.rental = rentalinfo;
        if (this.rental.currenttime <= 0) {
          this.rental.currenttime = 0;
        }
        this.loading = false;
      })
    });
  }

  return(): void {
    if (this.rental.currenttime != 0) {
      this.updateCurrentTime(this.cleanTime());
    }
    this.playing = false;
    this.ending = true;
    this.router.navigate(['/membre']);
  }

  // À partir d'ici le code est pris en ligne 

  initIframe(): void {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  playerReady(event: any) {
    this.player = event.target;
    event.target.seekTo(this.rental.currenttime);
    event.target.playVideo();
    this.playing = true;
  }

  updateCurrentTime(time: number) {
    this.rental.currenttime = time;
    this.communicationService.rentFilm(this.rental).subscribe((rentalinfo: RentalInfo) => {
      this.rental = rentalinfo;
      this.loading = false;
    });
  }

  onPlayerStateChange(event: any): void {
    switch (event.data) {
      case (window as any)['YT'].PlayerState.PLAYING:
        this.playing = true;
        this.ending = false;
        break;
      case (window as any)['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          this.updateCurrentTime(this.cleanTime())
        }
        this.playing = false;
        this.ending = false;
        break;
      case (window as any)['YT'].PlayerState.ENDED:
        this.updateCurrentTime(-1);
        this.playing = false;
        this.ending = true;
        break;
    };
  }

  cleanTime(): number {
    return Math.round(this.player.getCurrentTime());
  }
}
