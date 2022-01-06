import { Component, OnInit } from '@angular/core';

export interface RecordingsData {
  Filename:string,	
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recordingsData : RecordingsData[] =[{
    "Filename": "26.12.2021_12345678.wav"
  }]
  displayedColumns: string[] = ['Nagrania'];
  constructor() { }

  ngOnInit(): void {
  }

}
