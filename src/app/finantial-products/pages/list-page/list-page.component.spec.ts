import { ListPageComponent } from './list-page.component';
import { FinantialProduct } from '../../interfaces/finantial-product.interface';
import { FinantialProductsService } from '../../services/finantial-products.service';
import { of } from 'rxjs';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let finantialProductsService: FinantialProductsService;

  beforeEach(() => {
    finantialProductsService = {
      getFinantialProducts: jest.fn(() => of([]))
    } as unknown as FinantialProductsService;
    component = new ListPageComponent(finantialProductsService);
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
});
