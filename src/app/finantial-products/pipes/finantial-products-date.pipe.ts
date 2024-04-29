import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finantialProductsDate'
})
export class FinantialProductsDatePipe implements PipeTransform {

  transform(finantialProductDate: string): string {
    let dateWithSplit: string[] = finantialProductDate.split('T')[0].split('-');

    return `${dateWithSplit[2]}/${dateWithSplit[1]}/${dateWithSplit[0]}`;
  }
}
