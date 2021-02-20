import { ITableColumns } from './../../@core/interfaces/table-column.interface';
import { map } from 'rxjs/internal/operators/map';
import { IResultData, IInfoPage } from './../../@core/interfaces/result-data';
import { TablePaginationService } from './table-pagination.service';
import { DocumentNode } from 'graphql';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent implements OnInit {
  // informacion de entrada que proviene del componente donde se usa este componente
  @Input() query: DocumentNode;
  @Input() context: object;
  @Input() itemsPage = 20;
  @Input() resultData: IResultData;
  @Input() tableColumns: Array<ITableColumns> = undefined;
  @Input() include = true;
  // informacion de salida que sera tomada en el componente que requiera la informacion
  @Output() manageItem = new EventEmitter<Array<any>>();
  infoPage: IInfoPage;
  data$: Observable<any>
  constructor(private service: TablePaginationService) {}

  ngOnInit(): void {
    if (this.query === undefined) {
      throw new Error('Query is undefined');
    }
    if (this.resultData === undefined) {
      throw new Error('resultData is undefined');
    }
    if (this.tableColumns === undefined) {
      throw new Error('tableColumns is undefined');
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1,
    };
    this.loadData();
  }
  loadData() {
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include,
    };
    this.data$ = this.service
      .getCollectionData(this.query, variables, {})
      .pipe(
        map((result: any)=> {
          const data = result[this.resultData.definitionKey];
          this.infoPage.pages = data.info.pages;
          this.infoPage.page = data.info.page;
          this.infoPage.total = data.info.total;
          this.infoPage.itemsPage = data.info.itemsPage;
          return data[this.resultData.listKey];
        })
      );
  }
  changePage(){
    this.loadData();
  }
  manageAction(action: string, data: any){
     this.manageItem.emit([action, data]);
     
  }
}
