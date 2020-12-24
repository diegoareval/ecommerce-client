import { PublicComponent } from './public.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: PublicComponent,
  children: [
    {
      path: `home`, loadChildren: () =>
        import('./home/home.module').then(m => m.HomeModule)
    },
    {
      path: `about`, loadChildren: () =>
        import('./about/about.module').then(m => m.AboutModule)
    },
    {
      path: `contact`, loadChildren: () =>
        import('./contact/contact.module').then(m => m.ContactModule)
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
