import { FinantialProductsFilterPipe } from './finantial-products-filter.pipe';
import { FinantialProduct } from '../interfaces/finantial-product.interface';

describe('FinantialProductsFilterPipe', () => {
  let pipe: FinantialProductsFilterPipe;

  beforeEach(() => {
    pipe = new FinantialProductsFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if no searchText provided', () => {
    const finantialProducts: FinantialProduct[] = [
      {
        id: '1', name: 'Product 1',
        description: 'Description 1',
        logo: '',
        date_release: '',
        date_revision: ''
      },
      {
        id: '2', name: 'Product 2',
         description: 'Description 2',
        logo: '',
        date_release: '',
        date_revision: ''
      }
    ];
    const searchText = '';

    const result = pipe.transform(finantialProducts, searchText);

    expect(result).toEqual(finantialProducts);
  });

  it('should filter finantial products by name and description', () => {
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
        id: '2', name: 'Product 2',
        description: 'Description 2',
        logo: '',
        date_release: '',
        date_revision: ''
      },
      {
        id: '3', name: 'Product 3',
        description: 'Description 3',
        logo: '',
        date_release: '',
        date_revision: ''
      }
    ];
    const searchText = 'Product 1';

    const result = pipe.transform(finantialProducts, searchText);

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(finantialProducts[0]);
  });

  it('should return an empty array if no match found', () => {
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
    const searchText = 'Product 3';

    const result = pipe.transform(finantialProducts, searchText);

    expect(result.length).toBe(0);
  });

  it('should return an empty array if input is null or undefined', () => {
    const finantialProducts: FinantialProduct[] = [];
    const searchText = 'Product 1';

    const result = pipe.transform(finantialProducts, searchText);

    expect(result).toEqual([]);
  });
});
