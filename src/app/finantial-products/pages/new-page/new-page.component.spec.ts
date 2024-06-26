import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPageComponent } from './new-page.component';

describe('EditComponent', () => {
  let component: NewPageComponent;
  let fixture: ComponentFixture<NewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPageComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
