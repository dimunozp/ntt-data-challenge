import { FinantialProductsDatePipe } from './finantial-products-date.pipe';

describe('FinantialProductsDatePipe', () => {
  let pipe: FinantialProductsDatePipe;

  beforeEach(() => {
    pipe = new FinantialProductsDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform date string into expected format', () => {
    const finantialProductDate = '2022-12-31T00:00:00';
    const transformedDate = pipe.transform(finantialProductDate);
    expect(transformedDate).toEqual('31/12/2022');
  });

});
