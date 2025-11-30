import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthValidation } from './auth-validation';

describe('AuthValidation', () => {
  let component: AuthValidation;
  let fixture: ComponentFixture<AuthValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthValidation],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthValidation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
