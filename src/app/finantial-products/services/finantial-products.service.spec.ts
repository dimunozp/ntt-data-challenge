import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FinantialProductsService } from './finantial-products.service';
import { FinantialProduct } from '../interfaces/finantial-product.interface';
import { environments } from '../../../environments/environments';

describe('FinantialProductsService', () => {
  let service: FinantialProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinantialProductsService]
    });

    service = TestBed.inject(FinantialProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch finantial products', () => {
    const mockFinantialProducts: FinantialProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        logo: '',
        description: '',
        date_release: '',
        date_revision: ''
      },
      {
        id: '2',
        name: 'Product 2',
        logo: '',
        description: '',
        date_release: '',
        date_revision: ''
      }
    ];

    service.getFinantialProducts().subscribe(products => {
      expect(products).toEqual(mockFinantialProducts);
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}/bp/products`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockFinantialProducts);
  });

  it('should check if finantial product exists', () => {
    const productId = '123';
    const exists = true;

    service.getExistFinantialProduct(productId).subscribe(result => {
      expect(result).toEqual(exists);
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}/bp/products/verification?id=${productId}`);

    expect(req.request.method).toEqual('GET');

    req.flush(exists);
  });

  it('should post new finantial product', () => {
    const newProduct: FinantialProduct = {
      id: '3',
      name: 'Product 3',
      logo: '',
      description: '',
      date_release: '',
      date_revision: ''
    };

    service.postNewFinantialProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}/bp/products`);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newProduct);

    req.flush(newProduct);
  });
});
