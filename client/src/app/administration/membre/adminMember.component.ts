import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/services/serverCommunication/communication.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { InsertUpdateDeleteMessage } from '../../../../../common/communication/message';
import { ALERTTYPE } from 'src/app/shared/utils';
import { ERROR_TYPE } from '../../../../../common/error/errors';

@Component({
  selector: 'app-adminMember',
  templateUrl: './adminMember.component.html',
  styleUrls: ['./adminMember.component.css']
})
export class AdminMemberComponent implements OnInit {
  memberForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    type: ['MTH', Validators.required],
    address: this.fb.group({
      idAddress: ['-1', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['QC', Validators.required],
      pc: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      country: ['', Validators.required],
    }),
  });
  constructor(private fb: FormBuilder, private communicationService: CommunicationService,
    private alertSevice: AlertService) { }

  ngOnInit(): void {
  }

  onSubmitMember() {
    this.communicationService.createMember(this.memberForm.value).subscribe((msg: InsertUpdateDeleteMessage) => {
      if (msg.isInserted) {
        this.alertSevice.sendAlert("Insertion réussie", ALERTTYPE.SUCCESS, 3000);
      } else {
        let reason = '';
        switch (msg.error) {
          case ERROR_TYPE.MISSING_FIELDS:
            reason = " Champs manquants"
            break;

          case ERROR_TYPE.ALLREADY_EXISTS:
            reason = " Courriel déjà inscrit"
            break;
          default:
            reason = " Raison Inconnue"
            break;
        }
        this.alertSevice.sendAlert(`Insertion Échoué. Raison : ${reason}`, ALERTTYPE.ERROR, 3000);
      }
    });
  }

}
