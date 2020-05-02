import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

export enum Events {
  ADD,
  DELETE,
  EDIT,
  ROW,
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit, OnChanges {
  @Input('headers') headers: string[];
  @Input('table-data') data: string[][];
  @Input('table-caption') caption: string;
  @Input('event-config') events: Events[];
  @Input('table-class') tableClass: string;

  @Output('add-data') addOutput = new EventEmitter();
  @Output('delete') deleteOutput = new EventEmitter<number>();
  @Output('edit') editOutput = new EventEmitter<number>();
  @Output('rowClicked') rowClickedOutput = new EventEmitter<number>();

  _headers: string[];
  _data: string[][];
  _caption: string;
  _events: Events[];

  showAddButton: boolean;
  showDeleteButton: boolean;
  showEditButton: boolean;
  rowClickable: boolean;

  columnSortIndex: number;
  isOrdered: boolean;

  _tableClass: string;

  searchText: string;

  constructor() {
  }

  ngOnInit(): void {
    this._headers = [];
    this._data = [];
    this._caption = "";
    this._events = [];
    this.columnSortIndex = -1;
    this.isOrdered = false;
    this.showAddButton = false;
    this.showDeleteButton = false;
    this.showEditButton = false;
    this.rowClickable = false;
    this._tableClass = 'table table-bordered table-hover';
  }


  ngOnChanges(): void {
    if (typeof this.headers !== 'undefined' && this.headers != this._headers) {
      this._headers = this.headers;
    }
    if (typeof this.data !== 'undefined' && this.data != this._data) {
      this._data = this.data.slice();
    }
    if (typeof this.caption !== 'undefined' && this.caption != this._caption) {
      this._caption = this.caption;
    }
    if (typeof this.events !== 'undefined' && this._events != this.events) {
      this._events = this.events;
      this.configEvents();
    }
    if (typeof this.tableClass !== 'undefined' && this.tableClass != this._tableClass) {
      this._tableClass = this.tableClass;
    }
  }

  private configEvents(): void {
    if (this._events.indexOf(Events.ADD) != -1)
      this.showAddButton = true;
    if (this._events.indexOf(Events.DELETE) != -1)
      this.showDeleteButton = true;
    if (this._events.indexOf(Events.EDIT) != -1)
      this.showEditButton = true;
    if (this._events.indexOf(Events.ROW) != -1)
      this.rowClickable = true;
  }
  areButtonsShow(): boolean {
    return this.showAddButton || this.showDeleteButton || this.showEditButton;
  }

  add(): void {
    this.addOutput.emit();
  }

  delete(rowIndex: number): void {
    this.deleteOutput.emit(this.getRealIndex(rowIndex));
  }

  edit(rowIndex: number): void {
    this.editOutput.emit(this.getRealIndex(rowIndex));
  }

  rowClicked(rowIndex: number): void {
    if (this.rowClickable)
      this.rowClickedOutput.emit(this.getRealIndex(rowIndex));
  }

  private getRealIndex(sortedIndex: number): number {
    return this.data.indexOf(this._data[sortedIndex]);
  }

  sortColumn(columnIndex: number): void {
    if (columnIndex >= 0 && columnIndex < this._data.length) {
      this.isOrdered = !this.isOrdered;
      this.columnSortIndex = columnIndex;
      this._data.sort((rowA, rowB) => {
        if (rowA[columnIndex] < rowB[columnIndex])
          return this.isOrdered ? -1 : 1;
        if (rowA[columnIndex] > rowB[columnIndex])
          return this.isOrdered ? 1 : -1;
        return 0
      });
    }
  }

  getSortedClass(): string {
    return this.isOrdered ? 'fa fa-sort-up' : 'fa fa-sort-down';
  }

  searchField(): void {
    if (this.searchText.length != 0) {
      let tempTable = this.data.slice();
      this._data = [];
      tempTable.forEach((row) => {
        const indexFound = row.findIndex( (field)=>{
          return field.toString().toLowerCase().includes(this.searchText.toLowerCase());
        })
        if (indexFound!=-1) {
          this._data.push(row);
        }
      })
    } else {
      this._data = this.data.slice();
    }

    this.sortColumn(this.columnSortIndex);
  }
}
