import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: `home`, loadChildren: () =>
      import('./@public/page/home/home.module').then(m => m.HomeModule)
  },
  {
    path: `about`, loadChildren: () =>
      import('./@public/page/about/about.module').then(m => m.AboutModule)
  },
  {
    path: `contact`, loadChildren: () =>
      import('./@public/page/contact/contact.module').then(m => m.ContactModule)
  },
  { path: ``, redirectTo: `home`, pathMatch: `full` }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      scrollPositionRestoration: "enabled"
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }