import { IResultData } from './../../../@core/interfaces/result-data';
import { USERS_LIST_QUERY } from './../../../@graphql/operations/query/user';
import { Component, Input, OnInit } from '@angular/core';
import {DocumentNode} from "graphql"
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  query : DocumentNode = USERS_LIST_QUERY;
  context : object;
  itemsPage: number;
  include: boolean;
  resultData: IResultData
  ngOnInit(): void {
  }

}
