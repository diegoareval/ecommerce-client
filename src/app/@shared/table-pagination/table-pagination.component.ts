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
   @Input() include = true;
  constructor(private service: TablePaginationService) { }

  ngOnInit(): void {
    if(this.query === undefined){
       throw new Error("Query is undefined")
    }
    this.loadData();
  }
   loadData() {
     this.service.getCollectionData(this.query, {include: this.include}, {}).subscribe((result)=>{
       console.log(result);
       
     })
   }
}
