import { ListPageComponent } from './list-page.component';
import { FinantialProduct } from '../../interfaces/finantial-product.interface';
import { FinantialProductsService } from '../../services/finantial-products.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let finantialProductsService: FinantialProductsService;
  let router: Router;
  let navigateSpy: jest.SpyInstance;

  beforeEach(() => {
    finantialProductsService = {
      getFinantialProducts: jest.fn(() => of([]))
    } as unknown as FinantialProductsService;
    router = {
      navigate: jest.fn()
    } as unknown as Router;
    navigateSpy = jest.spyOn(router, 'navigate');
    component = new ListPageComponent(finantialProductsService, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component', () => {
    const finantialProducts: FinantialProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: '',
        date_release: '',
        date_revision: ''
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: '',
        date_release: '',
        date_revision: ''
      }
    ];
    jest.spyOn(finantialProductsService, 'getFinantialProducts').mockReturnValue(of(finantialProducts));

    component.ngOnInit();

    expect(finantialProductsService.getFinantialProducts).toHaveBeenCalled();
    expect(component.finantialProducts).toEqual(finantialProducts);
    expect(component.total).toBe(finantialProducts.length);
  });

  it('should set searchText when receiveMessage is called', () => {
    const searchText = 'Search Text';

    component.receiveMessage(searchText);

    expect(component.searchText).toBe(searchText);
  });

  it('should return pageNumbers', () => {
    const pageNumbers = component.pageNumbers;

    expect(pageNumbers).toEqual([5, 10, 20]);
  });

  it('should return pagedItems', () => {
    const finantialProducts: FinantialProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: '',
        date_release: '',
        date_revision: ''
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: '',
        date_release: '',
        date_revision: ''
      }
    ];
    component.finantialProducts = finantialProducts;

    const pagedItems = component.pagedItems;

    expect(pagedItems).toEqual(finantialProducts.slice(0, component.selectedValue));
  });

  it('should navigate to edit page with correct product', () => {
    const mockProduct: FinantialProduct = {
      id: '1',
      name: 'Mock Product',
      description: 'This is a mock product',
      logo: 'mock-url',
      date_release: '2024-05-01T00:00:00.000Z',
      date_revision: '2024-05-02T00:00:00.000Z'
    };

    component.editFinantialProduct(mockProduct);

    expect(navigateSpy).toHaveBeenCalledWith(['/finantial-products/edit/1'], {
      state: { product: mockProduct }
    });
  });
});
