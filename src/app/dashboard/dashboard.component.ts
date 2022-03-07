import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import 'rxjs/add/operator/map';
import { config, SecretsManager, S3 , CognitoIdentityCredentials} from 'aws-sdk';
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
      this.recordingsData = new MatTableDataSource(recordingsData);
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
        alert("Failed to retrieve object: " + err)
      }else{
          const blob = new Blob([data.Body], {
          type: data.ContentType,
        });
        saveAs(blob, filename);
       }
    })

  }

}
