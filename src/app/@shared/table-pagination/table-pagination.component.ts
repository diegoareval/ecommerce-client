import { map } from 'rxjs/internal/operators/map';
import { IResultData, IInfoPage } from './../../@core/interfaces/result-data';
import { TablePaginationService } from './table-pagination.service';
import { DocumentNode } from 'graphql';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode;
  @Input() context: object;
  @Input() itemsPage = 20;
  @Input() resultData: IResultData;
  @Input() include = true;
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
}
