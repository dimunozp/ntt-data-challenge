import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { EditComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutPageComponent,
    children: [
      {
        path: "new",
        component: NewPageComponent
      },
      {
        path: "list",
        component: ListPageComponent
      },
      {
        path: "edit/:id",
        component: EditComponent
      },
      {
        path: "**",
        redirectTo: "list"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinantialProductsRoutingModule { }
