import { Component, inject, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@org/auth'

@Component({
  selector: 'lib-membership',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './membership.html',
  styleUrl: './membership.css',
})
export class Membership implements OnInit {
  membershipForm!: FormGroup;

  // Component State
  isSubmitting = false;
  submissionMessage = '';
  isSubmissionSuccess: boolean | null = null;
  
  // Data for Select options
  membershipLevels: string[] = ['Standard', 'Gold', 'Platinum'];

  fb = inject(FormBuilder);
  authService = inject(AuthService)

  get membershipFormControl() {
    return this.membershipForm.controls;
  }

  get personalDetails() {
    return (this.membershipFormControl['personalDetails'] as FormGroup).controls;
  }

  ngOnInit(): void {
    this.membershipForm = this.fb.group({
      // Personal Details Group
      personalDetails: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.pattern('^[0-9]{10}$'), Validators.required]]
      }),
      
      // Membership Group
      membership: this.fb.group({
        level: ['', Validators.required],
        duration: ['1 year', Validators.required],
        newsletter: [false] // Checkbox default value
      }),

      // Agreement Checkbox
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    this.isSubmissionSuccess = null;
    this.submissionMessage = '';

    if (this.membershipForm.invalid) {
      // Mark all controls as touched to display validation errors
      this.membershipForm.markAllAsTouched();
      this.submissionMessage = 'Please correct the errors in the form before submitting.';
      return;
    }

    this.isSubmitting = true;
    
    // The data object to send to the backend
    const formData = this.membershipForm.value;
    console.log('Submitting Data:', formData);

    // --- Simulated Backend API Call ---
    // const apiUrl = '/api/membership-applications'; 
    
    // this.http.post(apiUrl, formData)
    //   .pipe(
    //     // Simulate a successful response from a backend
    //     map(() => ({ success: true, message: 'Your application has been successfully submitted!' }))
    //   )
    //   .subscribe({
    //     next: (res: any) => {
    //       this.isSubmissionSuccess = true;
    //       this.submissionMessage = res.message;
    //       this.membershipForm.reset({ // Reset the form after success
    //         membership: { duration: '1 year', newsletter: false },
    //         termsAccepted: false
    //       });
    //     },
    //     error: (err) => {
    //       this.isSubmissionSuccess = false;
    //       this.submissionMessage = 'Submission failed. Please try again later.';
    //       console.error('API Error:', err);
    //     },
    //     complete: () => {
    //       this.isSubmitting = false;
    //     }
    //   });
  }

}
