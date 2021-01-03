import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.start();
 }

}
