import { ValidatorService } from './validators.service';
import { FinantialProductsService } from './finantial-products.service';
import { of } from 'rxjs';

describe('ValidatorService', () => {
  let service: ValidatorService;
  let finantialProductsService: FinantialProductsService;

  beforeEach(() => {
    finantialProductsService = {
      getExistFinantialProduct: jest.fn().mockResolvedValue(true)
    } as unknown as FinantialProductsService;
    service = new ValidatorService(finantialProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate id exists', async () => {
    const control = { value: 'valid-id' } as any;
    const spy = jest.spyOn(finantialProductsService, 'getExistFinantialProduct').mockReturnValue(of(true));

    const result = service.validateIdExists(control);

    expect(spy).toHaveBeenCalled();
    expect(result).not.toBeNull();
  });

  it('should validate date not in past', () => {
    const control = { value: '2123-01-01' } as any;
    const result = service.validateDateNotInPast(control);
    expect(result).toBeNull();
  });

  it('should validate field is valid', () => {
    const form = { controls: { 'field': { errors: null, touched: true } } } as any;
    const result = service.isValidField(form, 'field');
    expect(result).toBeNull();
  });

  it('should get field error message', () => {
    const form = { controls: { 'field': { errors: { 'required': true }, touched: true } } } as any;
    const result = service.getFieldError(form, 'field');
    expect(result).toBe('Este campo es requerido');
  });
});
