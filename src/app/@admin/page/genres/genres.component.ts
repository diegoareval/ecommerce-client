import { GenresService } from './genres.service';
import { ITableColumns } from './../../../@core/interfaces/table-column.interface';
import { IResultData } from './../../../@core/interfaces/result-data';
import { GENRE_LIST_QUERY } from './../../../@graphql/operations/query/genre';
import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { formBasicDialog } from '@shared/alerts/alerts';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  query: DocumentNode = GENRE_LIST_QUERY;
  context: object;
  itemsPage: number;
  include: boolean;
  resultData: IResultData;
  columns: Array<ITableColumns>;
  constructor(private service: GenresService) {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 5;
    this.resultData = {
      listKey: 'genres',
      definitionKey: 'genres',
    };
    this.include = true;
    this.columns = [
      {
        property: 'id',
        label: '#',
      },
      {
        property: 'name',
        label: 'Nombre del Genero',
      },
      {
        property: 'slug',
        label: 'Slug',
      },
    ];
  }

  async takeAction($event: any) {
    const action = $event[0];
    const genre = $event[1];
    let defaultValue = '';
    if (genre.name !== undefined && genre.name !== '') {
      defaultValue = genre.name;
    }
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;
    if (action === 'add') {
      const result = await formBasicDialog('Añadir Genero', html, 'name');
      if (result.value) {
        this.addGenre(result);
        return;
      }
      return;
    }
    if (action === 'edit') {
      const result = await formBasicDialog('Modificar Genero', html, 'name');
      if (result.value) {
        this.editGenre(genre.id, result);
        return;
      }
      return;
    }
  }

  addGenre(result: any) {
    this.service.addGenre(result.value).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.ERROR, res.message);
    });
  }

  editGenre(id: string, result: any) {
    this.service.updateGenre(id, result.value).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.ERROR, res.message);
    });
  }
}
