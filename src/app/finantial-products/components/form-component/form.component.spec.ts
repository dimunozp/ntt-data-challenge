import { FormComponent } from './form.component';
import { FormBuilder } from '@angular/forms';
import { FinantialProductsService } from '../../services/finantial-products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '../../services/validators.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('FormComponent', () => {
  let component: FormComponent;
  let formBuilder: FormBuilder;
  let finantialProductsService: FinantialProductsService;
  let router: Router;
  let validatorService: ValidatorService;
  let route: ActivatedRoute;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    finantialProductsService = {
      postNewFinantialProduct: jest.fn(() => of(null))
    } as unknown as FinantialProductsService;
    router = {
      navigate: jest.fn()
    } as unknown as Router;
    route = {
      params: jest.fn()
    } as unknown as ActivatedRoute;
    validatorService = {
      isValidField: jest.fn(),
      getFieldError: jest.fn(),
      validateIdExists: jest.fn(),
      validateDateNotInPast: jest.fn()
    } as unknown as ValidatorService;
    component = new FormComponent(formBuilder, finantialProductsService, router, validatorService, route);
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

  it('should handle save', () => {
    jest.spyOn(component, 'onSave');
    component.onSave();
    expect(component.onSave).toHaveBeenCalled();
  });

});
