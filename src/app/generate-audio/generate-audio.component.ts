import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import {Lambda} from 'aws-sdk';

@Component({
  selector: 'app-generate-audio',
  templateUrl: './generate-audio.component.html',
  styleUrls: ['./generate-audio.component.css']
})
export class GenerateAudioComponent implements OnInit {
  inputText = ''
  isLoading = false;

  async onGenerateAudio(){
    let username = this.authService.getAuthenticatedUser()["username"];
    const params = {
      FunctionName: 'create_recording', 
      Payload: JSON.stringify({
        'username': username, 
        'text': this.inputText,
      }),
    };
    const lambda = new Lambda({
      accessKeyId: "AKIAXT3BVRFHDAKMU6WW",
      secretAccessKey: "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",
      region: "us-east-1"
    });
    this.isLoading = true;
    const result = await (lambda.invoke(params).promise());
    this.isLoading = false;
    console.log(result)
    alert("Sukces! Twoje nagranie pojawi się niedługo na liście.")
    this.inputText = ""
    setTimeout(() => {window.location.reload()}, 2000);
    

    //TODO: add service to refresh recording list and subscribe


    // Use case np mpk albo inny IVR, opisz IVR

  }
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
  }

}
