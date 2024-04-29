import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: "finantial-products",
    loadChildren: () => import("./finantial-products/finantial-products.module").then(m => m.FinantialProductsModule),
  },
  {
    path: "404",
    component: Error404PageComponent,
  },
  {
    path: "",
    redirectTo: "finantial-products",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "404",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
