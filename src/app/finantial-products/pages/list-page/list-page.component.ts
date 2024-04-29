import { Component, OnInit } from '@angular/core';
import { FinantialProduct } from '../../interfaces/finantial-product.interface';
import { FinantialProductsService } from '../../services/finantial-products.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.styles.css'],
})
export class ListPageComponent implements OnInit {

  constructor(private finantialProductsService: FinantialProductsService){}

  searchText: string = "";

  receiveMessage(event: string) {
    this.searchText = event;
  }

  public finantialProductsTitles: string[] = [
    "Logo",
    "Nombre del producto",
    "Descripción",
    "Fecha de liberación",
    "Fecha de restructuración"
  ];

  public finantialProducts: FinantialProduct[] = [];

  public selectedValue = 5;

  public total = 0;

  get pageNumbers(): number[] {
    return [5, 10, 20]
  }

  get pagedItems(): any[] {
    return this.finantialProducts.slice(0, this.selectedValue);
  }

  ngOnInit(): void {

    this.finantialProductsService.getFinantialProducts()
      .subscribe(finantialProducts => {
        this.finantialProducts = finantialProducts;
        this.total = finantialProducts.length;
      })

  }

}
