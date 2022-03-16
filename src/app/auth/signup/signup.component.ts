import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  activationFormOn = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  onRegistrationConfirm(form: NgForm) {
    this.authService.confirmUser(form.value.username, form.value.activationCode)
  }
  onSignup(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.authService.signUp(form.value.username, form.value.email, form.value.password);
    alert("Wysłaliśmy kod aktywacyjny na podany adres e-mail!")

  }
}
