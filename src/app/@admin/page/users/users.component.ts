import { IRegisterForm } from '@core/interfaces/register.interface';
import { UsersAdminService } from './users-admin.service';
import { optionsWithDetails, userFormBasicDialog } from '@shared/alerts/alerts';
import { ITableColumns } from './../../../@core/interfaces/table-column.interface';
import { IResultData } from './../../../@core/interfaces/result-data';
import { USERS_LIST_QUERY } from './../../../@graphql/operations/query/user';
import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
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
  constructor(private service: UsersAdminService){}
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

  private initForm(user: any){
     return `<input id="name" value="" class="swal2-input" placeholder="Nombre" required>
     <input id="lastname" value="" class="swal2-input" placeholder="Apellido" required>
     <input id="email" value="" class="swal2-input" placeholder="Email" required>
     <select id="role" class="swal2-input">
     <option value="ADMIN">Administrador</option>
     <option value="CLIENT">Cliente</option>
     </select>`;
  }

  async takeAction($event: any) {
    const action = $event[0];
    const user = $event[1];
   // console.log(action, user);
        // setting default value

       // const defaultValue = genre.name !== undefined && genre.name !== '' ? genre.name : '';
      const html = this.initForm(user)
      switch (action) {
        case 'add':
          this.addForm(html);
          break;
        case 'edit':
          //this.updateForm(html, genre);
          break;
        case 'lock':
         // this.blockModal(genre);
          break;
        case 'show':
          this.showModal(user);
          break;
      }
    
  }
  private addUser(result: any){
    const user: IRegisterForm = result;
    user.password = '1234';
    user.active = false;
    this.service.register(user).subscribe((res: any) => {
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.ERROR, res.message);
    });

  }

  private async addForm(html: string) {
    const result = await userFormBasicDialog('Añadir Usuario', html);
    if (result.value) {
      this.addUser(result);
      return;
    }
  }

  async showModal(user: any) {
    const result = await optionsWithDetails(
      'Detalles',
      `${user.name} ${user.lastname} </br>
      <i class="fas fa-envelope-open-text"><i/>&nbsp;&nbsp;${user.email}`,
      400
    );
    /*if (result) {
      this.updateForm(html, genre);
    } else if (result === false) {
      this.blockModal(genre);
    }
    return;
      */
  }

}
