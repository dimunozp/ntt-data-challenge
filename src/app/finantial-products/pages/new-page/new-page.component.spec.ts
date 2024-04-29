import { NewPageComponent } from './new-page.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinantialProductsService } from '../../services/finantial-products.service';
import { Router } from '@angular/router';
import { ValidatorService } from '../../services/validators.service';
import { of } from 'rxjs';

describe('NewPageComponent', () => {
  let component: NewPageComponent;
  let formBuilder: FormBuilder;
  let finantialProductsService: FinantialProductsService;
  let router: Router;
  let validatorService: ValidatorService;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    finantialProductsService = {
      postNewFinantialProduct: jest.fn(() => of(null))
    } as unknown as FinantialProductsService;
    router = {
      navigate: jest.fn()
    } as unknown as Router;
    validatorService = {
      isValidField: jest.fn(),
      getFieldError: jest.fn(),
      validateIdExists: jest.fn(),
      validateDateNotInPast: jest.fn()
    } as unknown as ValidatorService;
    component = new NewPageComponent(formBuilder, finantialProductsService, router, validatorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all fields as touched and return if form is invalid on save', () => {
    jest.spyOn(component.finantialProductForm, 'markAllAsTouched');

    component.onSave();

    expect(component.finantialProductForm.markAllAsTouched).toHaveBeenCalled();
    expect(finantialProductsService.postNewFinantialProduct).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should reset form on reset', () => {
    jest.spyOn(component.finantialProductForm, 'reset');

    component.onReset();

    expect(component.finantialProductForm.reset).toHaveBeenCalled();
  });
});
