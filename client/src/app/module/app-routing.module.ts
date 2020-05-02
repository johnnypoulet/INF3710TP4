import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdministrationComponent } from "../administration/administration.component";
import { AuthGuard } from "../services/authentification/auth.gard";
import { ROLE } from "../shared/utils";
import { MemberComponent } from "../member/member.component";
import { FilmComponent } from "../administration/film/film.component";
import { AdminMemberComponent } from "../administration/membre/AdminMember.component";
import { WatchMovieComponent } from "../member/watch-movie/watch-movie.component";

const routes: Routes = [
  {
    path: 'membre',
    canActivate: [AuthGuard],
    data: { roles: [ROLE.MEMBER] },
    children: [
      {
        path: '',
        component: MemberComponent,
      },
      {
        path: ':id',
        component: MemberComponent,
      },
      {
        path: 'watchMovie/:id',
        component: WatchMovieComponent,
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
    children: [
      {
        path: '',
        component: AdministrationComponent,
      },
      {
        path: 'membre',
        component: AdminMemberComponent,
      },
      {
        path: 'film',
        component: FilmComponent,
      },
      { 
        path: 'film/:id',
         component: FilmComponent 
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
