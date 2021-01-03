import { IMedata } from './../../../../@core/interfaces/session.interface';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // datos de la session
   session: IMedata = {
     status: false
   }
   // acceso y role
   access = false;
   role: string;
   userLabel = '';
  constructor(private auth: AuthService) {
    // suscribirse al observable
    this.auth.accessVar$.subscribe((result)=>{
      this.session = result;
      this.access = result.status;
      this.role = result.user?.role;
      this.userLabel = `${result.user?.name} ${result.user?.lastname}`
    });
   }

  ngOnInit(): void {
  }

  // cerrar sesion
  logout(){
    this.auth.removeSession();
  }

}
