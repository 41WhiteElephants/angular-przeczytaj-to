import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import 'rxjs/add/operator/map';

export interface RecordingData {
  id: number
  filename: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recordingsData: MatTableDataSource<RecordingData>;
  displayedColumns: string[] = ['Lp','Nagrania'];
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    let username = this.authService.getAuthenticatedUser()["username"];
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin',
      'Access-Control-Allow-Origin': '*',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    this.http.post(
      'https://y62narsvga.execute-api.us-east-1.amazonaws.com/dev/fetch_user_recordings',
      {"username": username}, requestOptions
    ).toPromise().then(data => {
      
      let filenames = data["Items"][0]["Filenames"]
      let recordingsData: RecordingData[] = filenames.map((item, idx) =>{
        return {id: ++idx, filename: item}
      });
      console.log("data " + recordingsData);
      this.recordingsData = new MatTableDataSource(recordingsData);
      console.log(this.recordingsData);
    })
  }

}
