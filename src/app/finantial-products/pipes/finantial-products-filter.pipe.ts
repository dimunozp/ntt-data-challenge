import { Pipe, PipeTransform } from '@angular/core';
import { FinantialProduct } from '../interfaces/finantial-product.interface';

@Pipe({
  name: 'finantialProductsFilter'
})
export class FinantialProductsFilterPipe implements PipeTransform {

  transform(finantialProducts: FinantialProduct[], searchText: string): FinantialProduct[] {
    if(!finantialProducts) return [];
    if(!searchText) return finantialProducts;
    searchText = searchText.toLowerCase();
    return finantialProducts.filter( finantialProduct => {
          return finantialProduct.name.toLowerCase().includes(searchText) || finantialProduct.description.toLowerCase().includes(searchText);
        });
   }

}
