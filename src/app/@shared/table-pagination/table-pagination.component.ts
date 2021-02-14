import { IResultData, IInfoPage } from './../../@core/interfaces/result-data';
import { USERS_LIST_QUERY } from './../../@graphql/operations/query/user';
import { TablePaginationService } from './table-pagination.service';
import { DocumentNode } from 'graphql';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
   @Input() query : DocumentNode = USERS_LIST_QUERY;
   @Input() context : object;
   @Input() itemsPage = 20;
   @Input() resultData: IResultData;
   @Input() include = true;
   infoPage: IInfoPage;
  constructor(private service: TablePaginationService) { }

  ngOnInit(): void {
    if(this.query === undefined){
       throw new Error("Query is undefined")
    }
    if(this.resultData === undefined){
      throw new Error("resultData is undefined")
   }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1
    }
    this.loadData();
  }
   loadData() {
     const variables = {
       page: this.infoPage.page,
       itemsPage: this.infoPage.itemsPage,
       include: this.include
     }
     this.service.getCollectionData(this.query,variables, {}).subscribe((result)=>{
       console.log(result);
       
     })
   }
}
