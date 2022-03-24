import {Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import 'rxjs/add/operator/map';
import { S3} from 'aws-sdk';
import { saveAs } from 'file-saver';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  username: string; 

  ngAfterViewInit() {
    this.ngOnInit()
  }

  ngOnInit(): void {
    this.username = this.authService.getAuthenticatedUser()["username"];

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin',
      'Access-Control-Allow-Origin': '*',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    const request_body = {
      "username": this.username,
    }
    this.http.post(
      'https://y62narsvga.execute-api.us-east-1.amazonaws.com/dev/fetch_user_recordings',
      request_body, requestOptions
    ).toPromise().then(data => {
      
      let recordingsData: RecordingData[] = data["recordingsData"]
      this.recordingsData = new MatTableDataSource(recordingsData);
      this.recordingsData.paginator = this.paginator;
    })
  }

  downloadFromS3(filename: string): void{
    const bucket = new S3({
      accessKeyId: "AKIAXT3BVRFHDAKMU6WW",
      secretAccessKey: "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",
      region: "us-east-1"
    });
    const params = {        
      Bucket: "aws-linux-academy-2k10-ml-sagemaker",
      Key: filename,
    };
    bucket.getObject(params, (err:any, data:any) =>{
      if (err) {
        alert("Błąd! Spróbuj ponownie.")
        console.log("error", err)
      }else{
          const blob = new Blob([data.Body], {
          type: data.ContentType,
        });
        saveAs(blob, filename);
       }
    })

  }

}
