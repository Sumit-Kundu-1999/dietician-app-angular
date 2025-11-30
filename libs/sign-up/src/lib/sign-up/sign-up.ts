import { Storage } from '@org/tools/storage';
import { AuthService } from '@org/auth'
import { DatabaseConnect } from '@org/tools/database-connect';
import { AuthValidation } from '@org/tools/auth-validation';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'lib-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit{
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<boolean>();

  myForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  statusMessage: {
    message: string,
    type: 'success' | 'error'
  } = {
    message: '',
    type: 'success'
  }
  submitBtnDisabled = true;

  validation = inject(AuthValidation);
  databaseConnectService = inject(DatabaseConnect);
  sessionStorage = inject(Storage);
  authService = inject(AuthService)
  router = inject(Router)

  get password() {
    return this.myForm.get('password');
  }

  get userName() {
    return this.myForm.get('name');
  }

  get email() {
    return this.myForm.get('email');
  }

  ngOnInit(): void {
      this.email?.valueChanges.pipe(
        debounceTime(2000)
      ).subscribe(() => {
        if(this.email?.value !== '' && this.userName?.value !== '' && this.password?.value !== '') {
          this.submitBtnDisabled = false;
        } else {
          this.submitBtnDisabled = true;
        }
      });

      this.password?.valueChanges.pipe(
        debounceTime(2000)
      ).subscribe(() => {
        this.passWordCheck();
      })
  }

  onClose() {
    this.closeModal.emit();
  }

  async onSubmit() {
    const user = this.userName?.value ?? '';
    const email = this.email?.value ?? '';
    const pass = this.password?.value ?? '';
    if (user !== '' && pass !== '' && email !== '') {
      this.createUsers();
    } else {
      this.statusMessage = {
        message: "Please Fill All the input",
        type: 'error'
      }
    }
  }

  onModalContentClick(event: Event): void {
    event.stopPropagation();
  }

  passWordCheck() {
    const value = this.password?.value ?? '';
    const passWordCheck = this.validation.passWordValidation(value);
    if (passWordCheck.isValid) {
      this.statusMessage = {
        message: passWordCheck.message,
        type: 'success'
      }
      this.submitBtnDisabled = false;
    } else {
      this.statusMessage = {
        message: passWordCheck.message,
        type: 'error'
      }
      this.submitBtnDisabled = true;
    }
  }

  private async createUsers() {
    this.authService.login({
        name: this.userName?.value,
        email: this.email?.value, 
        password: this.password?.value,
      }, 'register').subscribe({
        next: async (respose) => {
          console.log('User loggedin successfully', respose);
          await this.router.navigate(['overview']);
          this.statusMessage = {
            message: "User Created Successfully",
            type: 'success'
          }
        },
        error: (err) =>  {
          this.statusMessage = {
            message: err.error.msg,
            type: 'error'
          }
        },
      });
  }
}
