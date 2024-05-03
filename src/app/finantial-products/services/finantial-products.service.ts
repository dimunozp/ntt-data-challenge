import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinantialProduct } from '../interfaces/finantial-product.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class FinantialProductsService {

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getFinantialProducts():Observable<FinantialProduct[]> {

    return this.httpClient.get<FinantialProduct[]>(
      `${this.baseUrl}/bp/products`,
      {
        headers: {
          "authorId": "123"
        }
      }
    )
  }

  getExistFinantialProduct(id:string):Observable<boolean> {

    return this.httpClient.get<boolean>(
      `${this.baseUrl}/bp/products/verification?id=${id}`,
      {
        headers: {
          "authorId": "123"
        }
      }
    )
  }

  postNewFinantialProduct(finantialProduct: FinantialProduct):Observable<FinantialProduct> {

    return this.httpClient.post<FinantialProduct>(
      `${this.baseUrl}/bp/products`,
      finantialProduct,
      {
        headers: {
          "authorId": "123"
        }
      }
    )
  }

  putUpdateFinantialProduct(finantialProduct: FinantialProduct):Observable<FinantialProduct> {

    return this.httpClient.put<FinantialProduct>(
      `${this.baseUrl}/bp/products`,
      finantialProduct,
      {
        headers: {
          "authorId": "123"
        }
      }
    )
  }

}
