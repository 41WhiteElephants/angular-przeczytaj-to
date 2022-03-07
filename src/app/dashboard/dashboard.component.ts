import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import 'rxjs/add/operator/map';
import { S3Client, GetObjectCommand, GetObjectCommandOutput } from "@aws-sdk/client-s3";
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

  async downloadFromS3(filename: string){
    
    const s3Client = new S3Client({
      credentials: {
      accessKeyId: "AKIAXT3BVRFHDAKMU6WW",
      secretAccessKey: "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",
      },
      region: "us-east-1"
    });        
    const command = new GetObjectCommand({        
      Bucket: "aws-linux-academy-2k10-ml-sagemaker",
      Key: filename,
    });
    console.log("download"+ filename);
    const s3Item = await s3Client.send(command);
    const blob = new Blob([s3Item.Body as BlobPart], {
      type: "audio/wav",
    });
    saveAs(blob, filename);
  }

}
