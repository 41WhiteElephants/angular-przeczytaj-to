import { Injectable } from "@angular/core";

import {CognitoUserAttribute, CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserSession} from 'amazon-cognito-identity-js';
import { Subject } from 'rxjs';

import { BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { Router } from "@angular/router";

const POOL_DATA = {
    UserPoolId: 'us-east-1_Vv1fkp9fc',
    ClientId: '5jp42ciuv8p2dku6818svkpnkh'
  };
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable()
export class AuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();
  constructor(private router: Router) {}

  signUp(username: string, email: string, password: string): void {
    this.authIsLoading.next(true);
    const user: User = {
      username: username,
      email: email,
      password: password
    };
    const attrList : CognitoUserAttribute[] = [];
    const emailAttribute = {
      Name: 'email',
      Value: user.email
    };
    attrList.push(new CognitoUserAttribute(emailAttribute));
    // null cause no validation data
    userPool.signUp(user.username, user.password, attrList, null, (err, result) => {
        if(err){
            this.authDidFail.next(true);
            this.authIsLoading.next(false);
            console.log("error", err);
            alert("Błąd! "+err);
            return
        }
        this.authDidFail.next(false);
        this.authIsLoading.next(false);
        alert("Wysłaliśmy kod aktywacyjny na podany adres e-mail!")
    })
    return;
  }
  // this is what registation-confirm route will call
  confirmUser(username: string, code: string) {
    this.authIsLoading.next(true);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result)=>{
        if(err){
            this.authDidFail.next(true);
            this.authIsLoading.next(false);
            alert("Niepoprawny kod!")
            return
        }
        this.authDidFail.next(false);
        this.authIsLoading.next(false);
        this.router.navigate(['/login']);
    });
  }
  signIn(email: string, password: string): void {
    this.authIsLoading.next(true);
    const authData = {
      Username: email,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const _this = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess (result: CognitoUserSession) {
        _this.authStatusChanged.next(true);
        _this.authDidFail.next(false);
        _this.authIsLoading.next(false);
        console.log("success",result);
        _this.router.navigate(['/dashboard']);
      },
      onFailure (err) {
        _this.authDidFail.next(true);
        _this.authIsLoading.next(false);
        console.log("error",err);
        alert("Niepoprawne dane!")
      }
    });
    return;
  }
  resetPassword(email: string){
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const _this = this;
    cognitoUser.forgotPassword({
      onSuccess: function(result) {
          console.log('call result: ' + result);
      },
      onFailure: function(err) {
          alert(err);
      },
  });
    return;
  }
  resetPasswordConfirm(email: string, newPassword: string, code: string){
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise<void>((resolve, reject) => {
      cognitoUser.confirmPassword(code, newPassword, {
          onFailure(err) {
              reject(err);
          },
          onSuccess() {
              resolve();
          },
      });
  });
    return;
  }
  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }
  logout() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }
  isAuthenticated(): boolean{
    const user = this.getAuthenticatedUser();
    if (user!== null) {
      return true}
    return false
  }
}