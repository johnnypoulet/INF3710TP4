import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { AlertService } from '../alert/alert.service';
import { ALERTTYPE } from 'src/app/shared/utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/login/login.component';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthentificationService,
    private alertService:AlertService,
    private modalService: NgbModal,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isAdminLoggedIn() || this.authenticationService.isMemberLoggedIn()) {
      if (route.data.roles && route.data.roles.indexOf(this.authenticationService.getUserRole()) === -1) {
        // non-authorised
        //this.router.navigate(['/']);
        this.alertService.sendAlert("Vous n'avez pas les droits d'accès à cette page!", ALERTTYPE.WARNING, 4000);
        return false;
      }

      // authorised
      return true;
    }

    // not logged in so redirect to login page with the return url
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        this.alertService.sendAlert("Vous devez vous connecter d'abord!", ALERTTYPE.WARNING, 4000);
        this.modalService.open(LoginComponent);
    return false;
  }
}