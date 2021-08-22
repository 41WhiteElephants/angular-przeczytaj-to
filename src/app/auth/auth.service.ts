import { Injectable } from "@angular/core";

import {CognitoUserAttribute, CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserSession} from 'amazon-cognito-identity-js';

import {User} from "./user.model";
import { Router } from "@angular/router";

const POOL_DATA = {
    UserPoolId: 'us-east-1_Vv1fkp9fc',
    ClientId: '5jp42ciuv8p2dku6818svkpnkh'
  };
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable({providedIn: "root"})
export class AuthService{
    isLoading = false;
    registerdUser;
    constructor(private router: Router){}

    signUp(username: string, email: string, password: string): void {
        // this.authIsLoading.next(true);
        this.isLoading = true;
        const user: User = {
            username: username,
            email: email,
            password: password
        };
        const attrList: CognitoUserAttribute[] = [];
        const emailAttribute = {
            Name: 'email',
            Value: user.email
        };
        attrList.push(new CognitoUserAttribute(emailAttribute));
        userPool.signUp(user.username, user.password, attrList, null, (err, result)=>{
            if(err){
            // this.authDidFail.next(true);
            // this.authIsLoading.next(false);
            this.isLoading = false;
            return
            }
            // this.authDidFail.next(false);
            // this.authIsLoading.next(false);
            this.isLoading = false;
            this.registerdUser = result.user;
        });
        return;
        }
}