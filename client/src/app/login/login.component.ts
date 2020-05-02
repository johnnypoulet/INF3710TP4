import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  memberForm = this.fb.group({
    emailMember: ['', [Validators.required, Validators.email]],
    passwordMember: ['', Validators.required],
  });
  adminForm = this.fb.group({
    usernameAdmin: ['', [Validators.required]],
    passwordAdmin: ['', Validators.required],
  });

  private memberLoggedInSubsciption: Subscription;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private authentificationService: AuthentificationService) {
    this.memberLoggedInSubsciption = this.authentificationService.getUserLoggedInObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.activeModal.close();
      }
    });
  }
  ngOnDestroy(): void {
    this.memberLoggedInSubsciption.unsubscribe();
  }

  onSubmitMember() {
    this.authentificationService.tryLoginMember(this.memberForm.value.emailMember, this.memberForm.value.passwordMember);
  }
  onSubmitAdmin() {
    this.authentificationService.tryLoginAdmin(this.adminForm.value.usernameAdmin, this.adminForm.value.passwordAdmin);
  }

}
