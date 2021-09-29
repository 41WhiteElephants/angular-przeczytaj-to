import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  // todo: add switch for signup
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  onLogin(form: NgForm) {
    if (form.invalid){
      return;
    }
    console.log(form.value);

  }
}
