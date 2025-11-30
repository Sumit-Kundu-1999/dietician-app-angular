import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-weight-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './weightCalculator.html',
  styleUrl: './weightCalculator.css',
})
export class WeightCalculator {
  weightControl = new FormControl<number>(0);
  heightControl = new FormControl<number>(0);
  bmiResult: number | undefined = undefined;
  bmiCategory = '';

  controlValue(formControlName: FormControl): number {
    return formControlName.value;
  }

  /**
   * Calculates the Body Mass Index (BMI).
   * Formula: weight (kg) / [height (m)]²
   */
  calculateBMI(): void {
    const height = this.controlValue(this.heightControl) * 0.3048;
    const weight = this.controlValue(this.weightControl);
    // Basic validation
    if(weight <= 0 || height <=0){
      this.bmiResult = undefined;
      this.bmiCategory = 'Please enter valid Weight and Height.';
      return;
    }

    // Convert height from cm (if you were using cm) to meters before calculating,
    // but assuming inputs are in kg and meters for simplicity here.
    const bmi = weight / (height * height);
    
    // Round the result for display
    this.bmiResult = parseFloat(bmi.toFixed(3)); 
    
    this.setBmiCategory(this.bmiResult);
  }

  setBmiCategory(bmi: number): void {
    if (bmi < 18.5) {
      this.bmiCategory = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      this.bmiCategory = 'Normal Weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
      this.bmiCategory = 'Overweight';
    } else {
      this.bmiCategory = 'Obesity';
    }
  }
}
