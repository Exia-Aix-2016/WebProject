import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { baseUrl } from "./constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UploadFileService {
  constructor(private http: HttpClient) {}

  public uploadFile(fileToUpload: File): void {

     this.http.post(baseUrl + "pictures/imgs", fileToUpload, {
    headers: new HttpHeaders({
    'Content-Type':  'form-data',})
       
     }).map(data => {
       return true;
     }).subscribe();
  }
}
