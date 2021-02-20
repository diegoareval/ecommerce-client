import { GenresService } from './genres.service';
import { ITableColumns } from './../../../@core/interfaces/table-column.interface';
import { IResultData } from './../../../@core/interfaces/result-data';
import { GENRE_LIST_QUERY } from './../../../@graphql/operations/query/genre';
import { Component, OnInit } from '@angular/core';
import {DocumentNode} from "graphql"
import { formBasicDialog } from '@shared/alerts/alerts';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

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
  constructor(private service: GenresService) { }

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

  async takeAction($event: any){
    console.log($event[0], $event[1]);
    const action = $event[0];
    const html = '<input id="name" class="swal2-input" required>'
    if(action === 'add'){
      const result = await formBasicDialog("Añadir Genero", html, 'name');
      this.service.addGenere(result.value).subscribe((result: any)=> {
        if(result.status){
          basicAlert(TYPE_ALERT.SUCCESS, result.message);
          return;
        }
        basicAlert(TYPE_ALERT.ERROR,result.message);
      })    
    }
    
  }

}
