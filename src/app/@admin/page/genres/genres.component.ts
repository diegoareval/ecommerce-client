import { ITableColumns } from './../../../@core/interfaces/table-column.interface';
import { IResultData } from './../../../@core/interfaces/result-data';
import { GENRE_LIST_QUERY } from './../../../@graphql/operations/query/genre';
import { Component, OnInit } from '@angular/core';
import {DocumentNode} from "graphql"

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  query : DocumentNode = GENRE_LIST_QUERY;
  context : object;
  itemsPage: number;
  include: boolean;
  resultData: IResultData
  columns: Array<ITableColumns>;
  constructor() { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 5;
    this.resultData = {
      listKey: 'genres',
      definitionKey: 'genres'
    };
    this.include = true;
    this.columns = [{
      property: "id",
      label: "#"
    },
    {
      property: "name",
      label: "Nombre del Genero"
    },
    {
      property: "slug",
      label: "Slug"
    }
  ];
  }

  takeAction($event){
    console.log($event[0], $event[1]);
    
  }

}
