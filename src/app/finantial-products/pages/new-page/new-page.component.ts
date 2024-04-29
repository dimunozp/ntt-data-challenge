import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinantialProductsService } from '../../services/finantial-products.service';
import { Router } from '@angular/router';
import { ValidatorService } from '../../services/validators.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.styles.css']
})
export class NewPageComponent {

  public finantialProductForm:  FormGroup = this.formBuilder.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      [this.validatorService.validateIdExists.bind(this)]
    ],
    name:  [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
    ],
    description:  [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(200)]
    ],
    logo:  ['',[Validators.required]],
    date_release:  [null,[Validators.required, this.validatorService.validateDateNotInPast]],
    date_revision:  [null,[Validators.required],],
  });

  public existFinalProduct: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private finantialProductsService: FinantialProductsService,
    private router: Router,
    private validatorService: ValidatorService
  ){}

  isValidField( field: string): boolean | null {
    return this.validatorService.isValidField(this.finantialProductForm, field);
  }

  getFieldError(field: string): string | null{
    return this.validatorService.getFieldError(this.finantialProductForm, field);
  }

  onChangeDate(field: string){
    if(this.finantialProductForm.controls[field].errors){
      return;
    };
    const date_release = this.finantialProductForm.value[field].split("-");
    this.finantialProductForm.setValue({
      ...this.finantialProductForm.value,
      "date_revision": `${Number(date_release[0])+1}-${date_release[1]}-${date_release[2]}`
    })
  }

  onSave():void{
    if(this.finantialProductForm.invalid){
      this.finantialProductForm.markAllAsTouched();
      return;
    };

    this.finantialProductsService.postNewFinantialProduct(this.finantialProductForm.value)
      .subscribe(finantialProduct => {
        if(finantialProduct){
          this.router.navigate(['/finantial-products/']);
        }
      })
  }

  onReset():void{
    this.finantialProductForm.reset()
  }
}
