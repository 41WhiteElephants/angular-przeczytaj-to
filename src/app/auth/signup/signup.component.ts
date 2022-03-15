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
  switchToActivationForm(){
    this.activationFormOn = !this.activationFormOn;
  }
  onSignup(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.authService.signUp(form.value.username, form.value.email, form.value.password);

  }
}
