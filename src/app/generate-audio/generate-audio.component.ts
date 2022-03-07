import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-audio',
  templateUrl: './generate-audio.component.html',
  styleUrls: ['./generate-audio.component.css']
})
export class GenerateAudioComponent implements OnInit {
  inputText = ''

  onGenerateAudio(){
    console.log(this.inputText)
    //call lambda and add username to JSON
    //change sagemaker to save files as a date_random_string.mp3
    //change sagemaker to write data (username, s3_file_name) to dynamo_db


    // Use case np mpk albo inny IVR, opisz IVR

  }
  constructor() { }

  ngOnInit(): void {
  }

}
