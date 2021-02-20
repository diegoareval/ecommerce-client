import { ITableColumns } from './../../../@core/interfaces/table-column.interface';
import { IResultData } from './../../../@core/interfaces/result-data';
import { USERS_LIST_QUERY } from './../../../@graphql/operations/query/user';
import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  query: DocumentNode = USERS_LIST_QUERY;
  context: object;
  itemsPage: number;
  include: boolean;
  resultData: IResultData;
  columns: Array<ITableColumns>;
  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 5;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users',
    };
    this.include = true;
    this.columns = [{
      property: "id",
      label: "#"
    },
    {
      property: "name",
      label: "Nombre del Usuario"
    },
    {
      property: "email",
      label: "Email"
    },
    {
      property: "lastname",
      label: "Apellido"
    },
    {
      property: "role",
      label: "Rol"
    }
  ];
  }
}
