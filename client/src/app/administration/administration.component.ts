import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/serverCommunication/communication.service';
import { Events } from '../generic-table/generic-table.component';
interface Table {
  dbName: string;
  label: string;
}
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(private communicationService: CommunicationService) { }
  tables: Table[];
  selectedTable: string;
  headers: string[];
  tableData: string[][];

  eventsConfig:Events[];
  ngOnInit(): void {
    this.eventsConfig = [
      Events.ROW,
      Events.EDIT,
      Events.DELETE,
      Events.ADD
      ];
    this.tableData = [];
    this.headers = [];
    this.tables = [{
      dbName: "address",
      label: "Adresse"
    },
    {
      dbName: "admin",
      label: "Administration"
    },
    {
      dbName: "artist",
      label: "Artistes"
    },
    {
      dbName: "creditcard",
      label: "Cartes de Crédits"
    },
    {
      dbName: "dvdcopy",
      label: "Copies DVD"
    },
    {
      dbName: "dvddelivery",
      label: "Livraisons DVD"
    },
    {
      dbName: "dvdpurchase",
      label: "Achats DVD"
    },
    {
      dbName: "film",
      label: "Films"
    },
    {
      dbName: "member",
      label: "Membres"
    },
    {
      dbName: "onlinerental",
      label: "Location de film en ligne"
    },
    {
      dbName: "oscarcategory",
      label: "Catégories d'Oscar"
    },
    {
      dbName: "oscarceremony",
      label: "Cérémonies d'Oscar"
    },
    {
      dbName: "oscarnomination",
      label: "Nominations d'Oscar"
    },
    {
      dbName: "role",
      label: "Rôles"
    },
    {
      dbName: "roleartistfilm",
      label: "Rôle artist film"
    },
    {
      dbName: "subscriptionmth",
      label: "Souscription montant"
    },
    {
      dbName: "subscriptionppv",
      label: "Souscription 'Pay Per View'"
    },
    ]
  }

  getTable() {
    this.communicationService.getTableData(this.selectedTable).subscribe((tableData: any[]) => {
      this.tableData = new Array(tableData.length);
      this.headers = [];
      tableData.forEach((row, index) => {
        this.tableData[index] = [];


        if (this.headers.length== 0) {
          this.headers = Object.keys(row);
        }
        this.tableData[index]=Object.values(row);
      })
    });
  }

}
