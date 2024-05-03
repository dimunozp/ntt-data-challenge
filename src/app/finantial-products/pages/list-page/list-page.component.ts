import { Component, OnInit } from '@angular/core';
import { FinantialProduct } from '../../interfaces/finantial-product.interface';
import { FinantialProductsService } from '../../services/finantial-products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.styles.css'],
})
export class ListPageComponent implements OnInit {

  constructor(
    private finantialProductsService: FinantialProductsService,
    private router: Router,
  ){}

  searchText: string = "";
  isDropdownOpen: boolean = false;
  finantialProducts: FinantialProduct[] = [];
  selectedValue = 5;
  total = 0;
  finantialProductsTitles: string[] = [
    "Logo",
    "Nombre del producto",
    "Descripción",
    "Fecha de liberación",
    "Fecha de restructuración",
    "Opciones"
  ];

  ngOnInit(): void {

    this.finantialProductsService.getFinantialProducts()
      .subscribe(finantialProducts => {
        this.finantialProducts = finantialProducts;
        this.total = finantialProducts.length;
      })

  }

  editFinantialProduct(product: FinantialProduct) {
    this.router.navigate([`/finantial-products/edit/${product.id}`], {state: {product}});
  }

  deleteFinantialProduct(id: string) {
    // TODO: Lógica para eliminar el producto
  }

  receiveMessage(event: string) {
    this.searchText = event;
  }

  get pageNumbers(): number[] {
    return [5, 10, 20]
  }

  get pagedItems(): any[] {
    return this.finantialProducts.slice(0, this.selectedValue);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
