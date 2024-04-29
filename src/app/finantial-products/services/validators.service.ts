import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FinantialProductsService } from './finantial-products.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ValidatorService {

  constructor(
    private finantialProductsService: FinantialProductsService,
  ){}

  public validateIdExists(control: AbstractControl): ValidationErrors | null {

    const id = control.value;
    return this.finantialProductsService.getExistFinantialProduct(id)
      .pipe(map(exists => exists ? { 'idExists': true } : null))

  }

  public validateDateNotInPast(control: AbstractControl): ValidationErrors | null {
    const date: string[] = (control.value ? control.value : "1970-01-01").split("-");
    const selectedDate : Date = new Date(Number(date[0]), Number(date[1])-1, Number(date[2]), 23, 59, 59);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { 'dateInPast': true };
    }

    return null;
  }

  public isValidField( form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string): string | null{
    if(!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case "required":
          return 'Este campo es requerido';
        case "minlength":
          return `Se necesitan mínimo ${errors['minlength'].requiredLength} caracteres`;
        case "maxlength":
          return `Se admiten hasta ${errors['maxlength'].requiredLength} caracteres`;
        case "dateInPast":
          return "La fecha no puede ser menor a la fecha actual";
        case "idExists":
          return "ID no válido!";
      }
    }

    return null;
  }

}
