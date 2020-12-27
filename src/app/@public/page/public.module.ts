import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from '@public-core/components/header/header.component';
import { NavbarComponent } from '@public-core/components/navbar/navbar.component';
import { FooterComponent } from '@public-core/components/footer/footer.component';


@NgModule({
  declarations: [PublicComponent, HeaderComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
