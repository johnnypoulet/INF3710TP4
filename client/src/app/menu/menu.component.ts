import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {
  userLoggedInSubscription: Subscription;
  memberLoggedIn: boolean;
  adminLoggedIn: boolean;
  constructor(private modalService: NgbModal, private authentificationService: AuthentificationService) {
    this.memberLoggedIn = false;
    this.adminLoggedIn = false;
    this.userLoggedInSubscription = this.authentificationService.getUserLoggedInObservable().subscribe(() => {
        this.memberLoggedIn = this.authentificationService.isMemberLoggedIn();
        this.adminLoggedIn = this.authentificationService.isAdminLoggedIn();
    })
  }
  ngOnDestroy(): void {
    this.userLoggedInSubscription.unsubscribe();
  }

  logOut() {
    this.authentificationService.logOut();
  }
  openLoginModal() {
    this.modalService.open(LoginComponent);
  }

}
