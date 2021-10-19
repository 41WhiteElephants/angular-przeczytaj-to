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
    console.log(email, password);
    this.authService.signIn(email, password);
  }
}
