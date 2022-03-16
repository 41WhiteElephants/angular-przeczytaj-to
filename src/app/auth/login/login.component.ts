import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  didFail = false;
  isLoading = false;
  forgotPasswordFormOn = false;
  codeSent = false;
  constructor(private authService: AuthService) {
  }
  
  ngOnInit() {
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.authService.authDidFail.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid){
          return;
    }
    const email = form.value.email;
    const password = form.value.password;
    
    this.authService.signIn(email, password);
  }
  onResetPassword(email: string) {
    if(!email.includes("@")){
      alert("Wprowadź poprawny email!")
      return
    }  
    this.authService.resetPassword(email);
    alert("Wysłaliśmy kod aktywacyjny na podany adres e-mail!")
    this.codeSent = true;
  }
  onConfirmResetPassword(form: NgForm) {
    if (form.invalid){
          return;
    }
    const email = form.value.email;
    const newPassword = form.value.password;
    const newPasswordConfirm = form.value.confirmPassword;
    const code = form.value.code;
    if( newPassword !== newPasswordConfirm){
      alert("Hasła różnią się od siebie!")
      return
    }
    const res = this.authService.resetPasswordConfirm(email, newPassword, code);
    res.then(value =>{
      alert("Ustawiono nowe hasło!")
      this.forgotPasswordFormOn = false;
      this.codeSent = false;
    }).catch(err =>{
      console.log("error", err)
      alert("Nie udało się zresetować hasła! Spróbuj później.")
      
      this.forgotPasswordFormOn = false;
    })
  }
}
