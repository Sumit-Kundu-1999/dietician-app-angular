import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewFeature } from './new-feature';

describe('NewFeature', () => {
  let component: NewFeature;
  let fixture: ComponentFixture<NewFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(NewFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
