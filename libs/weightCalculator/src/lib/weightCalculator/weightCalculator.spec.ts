import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightCalculator } from './weightCalculator';

describe('WeightCalculator', () => {
  let component: WeightCalculator;
  let fixture: ComponentFixture<WeightCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(WeightCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
