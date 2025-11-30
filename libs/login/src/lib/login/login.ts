import { Storage } from '@org/tools/storage';
import { SignUp } from '@org/sign-up';
import { AuthValidation } from '@org/tools/auth-validation';
import { AuthService } from '@org/auth'
import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-login',
  imports: [CommonModule, ReactiveFormsModule, SignUp],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly loginSuccess: OutputEmitterRef<boolean> = output<boolean>();
  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  statusMessage = '';
  isSignUpPopUpOpen = false;

  get userName() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  router = inject(Router);
  validation = inject(AuthValidation);
  sessionStorageService = inject(Storage);
  authService = inject(AuthService)

  constructor() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['overview'])
    }
  }

  async onClick() {
    const user = this.userName?.value ?? '';
    const pass = this.password?.value ?? '';
    if (user !== '' && pass !== '') {
      this.setMessages({});
      this.authService.login({
        email: user, 
        password: pass,
      }).subscribe({
        next: async () => {
          await this.router.navigate(['overview']);
          this.loginSuccess.emit(this.authService.isLoggedIn());
        },
        error: (error) =>  {
          this.setMessages({ erroMsg: error.error.msg ?? 'Server Error' });
        },
      })

    } else {
      this.setMessages({ erroMsg: 'Please fill User name & Password' });
    }
  }

  closeSingInPopUp() {
    this.isSignUpPopUpOpen = false;
  }

  onClickSignUp() {
    this.isSignUpPopUpOpen = true;
  }

  private setMessages({
    erroMsg,
    successMsg,
  }: {
    erroMsg?: string;
    successMsg?: string;
  }) {
    if (erroMsg) {
      this.statusMessage = erroMsg;
    } else if (successMsg) {
      this.statusMessage = successMsg;
    } else if (!erroMsg && !successMsg) {
      this.statusMessage = '';
    }
  }
}
