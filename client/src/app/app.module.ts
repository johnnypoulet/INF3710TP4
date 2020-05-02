import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./module/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/serverCommunication/communication.service";
import { AdministrationComponent } from './administration/administration.component';
import { MenuComponent } from './menu/menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { MemberComponent } from './member/member.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { FilmComponent } from './administration/film/film.component';
import { AdminMemberComponent } from './administration/membre/AdminMember.component';
import { WatchMovieComponent } from './member/watch-movie/watch-movie.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    AppComponent,
    AdministrationComponent,
    MenuComponent,
    LoginComponent,
    AlertComponent,
    MemberComponent,
    GenericTableComponent,
    FilmComponent,
    AdminMemberComponent,
    WatchMovieComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    YouTubePlayerModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
