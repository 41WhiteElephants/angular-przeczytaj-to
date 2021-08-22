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
  }
  constructor() { }

  ngOnInit(): void {
  }

}
