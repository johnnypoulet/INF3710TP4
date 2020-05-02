import { Injectable } from '@angular/core';
import { Member, DEFAULTMEMBER } from "../../../../../common/tables/Member";
import { AuthentificationMemberMessage, AuthentificationAdminMessage } from "../../../../../common/communication/message";
import { Admin, DEFAULTADMIN } from "../../../../../common/tables/Admin";
import { Subject, Observable } from "rxjs";
import { CommunicationService } from "../serverCommunication/communication.service";
import { AlertService } from '../alert/alert.service';
import { ALERTTYPE, ROLE } from 'src/app/shared/utils';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private member: Member;
  private memberLoggedIn: boolean;
  private readonly memberSubject: Subject<Member>;


  private admin: Admin;
  private adminLoggedIn: boolean;
  private readonly adminSubject: Subject<Admin>;

  private readonly userLoggedInSubject: Subject<boolean>;

  private userRole:ROLE;

  constructor(private communicationService: CommunicationService, private alertService: AlertService, private router:Router) {
    this.member = DEFAULTMEMBER;
    this.memberLoggedIn = false;
    this.memberSubject = new Subject<Member>();
    this.admin = DEFAULTADMIN;
    this.adminLoggedIn = false;
    this.adminSubject = new Subject<Admin>();
    this.userRole = ROLE.DEFAULT;

    this.userLoggedInSubject = new Subject<boolean>();
  }

  getMemberObservable(): Observable<Member> {
    return this.memberSubject.asObservable();
  }

  getCurrentMember(): Member {
    return this.member;
  }
  isMemberLoggedIn(): boolean {
    return this.memberLoggedIn;
  }

  tryLoginMember(email: string, password: string) {
    const member: any = {
      email: email,
      password: password,
    }
    this.adminLoggedIn = false;
    this.communicationService.memberLogin(member).subscribe((result: AuthentificationMemberMessage) => {
      this.memberLoggedIn = result.isValid;
      this.member = this.memberLoggedIn ? result.member : DEFAULTMEMBER;
      this.memberSubject.next(this.member);
      this.userLoggedInSubject.next(this.memberLoggedIn);
      this.showMessage(this.memberLoggedIn);
      if(this.memberLoggedIn){
        this.userRole = ROLE.MEMBER;
        this.router.navigate(['/membre']);
      }
    });
  }


  getAdminObservable(): Observable<Admin> {
    return this.adminSubject.asObservable();
  }

  getCurrentAdmin(): Admin {
    return this.admin;
  }
  isAdminLoggedIn(): boolean {
    return this.adminLoggedIn;
  }

  tryLoginAdmin(username: string, password: string) {
    const admin: any = {
      username: username,
      password: password,
    }
    this.memberLoggedIn = false;
    this.communicationService.adminLogin(admin).subscribe((result: AuthentificationAdminMessage) => {
      this.adminLoggedIn = result.isValid;
      this.admin = this.adminLoggedIn ? result.admin : DEFAULTADMIN;
      this.adminSubject.next(this.admin);
      this.userLoggedInSubject.next(this.adminLoggedIn);
      this.showMessage(this.adminLoggedIn);
      if(this.adminLoggedIn){
        this.userRole = ROLE.ADMIN;
        this.router.navigate(['/admin']);
      }
    });
  }

  getUserLoggedInObservable(): Observable<boolean> {
    return this.userLoggedInSubject.asObservable();
  }

  showMessage(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      this.alertService.sendAlert("Connection Réussie", ALERTTYPE.SUCCESS, 3000);
    } else {
      this.alertService.sendAlert("Les informations de connexion ne sont pas correcte", ALERTTYPE.ERROR, 5000);
    }
  }

  logOut(): void {
    this.member = DEFAULTMEMBER;
    this.memberLoggedIn = false;
    this.admin = DEFAULTADMIN;
    this.adminLoggedIn = false;
    this.userLoggedInSubject.next(false);
    this.alertService.sendAlert("Déconnecté", ALERTTYPE.WARNING, 3000);
    this.userRole = ROLE.DEFAULT;
    this.router.navigate(['/']);
  }

  getUserRole():ROLE{
    return this.userRole;
  }
}
