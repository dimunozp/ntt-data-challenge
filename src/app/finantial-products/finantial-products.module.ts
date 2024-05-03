import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinantialProductsRoutingModule } from './finantial-products-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchComponent } from './components/search-component/search.component';
import { FinantialProductsDatePipe } from './pipes/finantial-products-date.pipe';
import { FinantialProductsFilterPipe } from './pipes/finantial-products-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form-component/form.component';
import { EditComponent } from './pages/edit-page/edit-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchComponent,
    FinantialProductsDatePipe,
    FinantialProductsFilterPipe,
    FormComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FinantialProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FinantialProductsModule { }
