import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinantialProductsService } from '../../services/finantial-products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '../../services/validators.service';
import { FinantialProduct } from '../../interfaces/finantial-product.interface';

@Component({
  selector: 'form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.styles.css']
})
export class FormComponent {

  id: string = "";
  isEditMode: boolean = false;
  opacityValue: number = 1;

  finantialProductForm:  FormGroup = this.formBuilder.group({
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



  constructor(
    private formBuilder: FormBuilder,
    private finantialProductsService: FinantialProductsService,
    private router: Router,
    private validatorService: ValidatorService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.setFormToEditMode();
  }

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
    });
  }

  onSave():void{
    if(this.finantialProductForm.invalid){
      this.finantialProductForm.markAllAsTouched();
      return;
    };

    if(this.isEditMode){
      this.finantialProductsService.putUpdateFinantialProduct(this.finantialProductForm.value)
      .subscribe(finantialProduct => {
        if(finantialProduct){
          this.router.navigate(['/finantial-products/']);
        }
      });
      return;
    }

    this.finantialProductsService.postNewFinantialProduct(this.finantialProductForm.value)
      .subscribe(finantialProduct => {
        if(finantialProduct){
          this.router.navigate(['/finantial-products/']);
        }
      });
  }

  onReset():void{
    this.finantialProductForm.reset()
  }

  private setFormToEditMode(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id && this.id !== ""){
        this.isEditMode = true;
        const product: FinantialProduct = history.state.product;
        this.finantialProductForm.get("id")?.clearAsyncValidators();
        this.finantialProductForm.get("date_release")?.setValidators(Validators.required);
        this.finantialProductForm.patchValue({
          id: product.id,
          name: product.name,
          logo: product.logo,
          description: product.description,
          date_release:  this.changeDateToInputFormat(product.date_release),
          date_revision:  this.changeDateToInputFormat(product.date_revision)
        });
      }

    });
  }

  private changeDateToInputFormat(date: string){
    return `${date.split("T")[0]}`
  }

  get buttonText(): string {
    return this.isEditMode ? 'Editar' : 'Guardar';
  }
}
