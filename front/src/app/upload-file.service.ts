import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { baseUrl } from "./constants";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class UploadFileService {
  constructor(private http: HttpClient) {}

  public uploadFile(fileToUpload): void {

    /*const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();

    formData.append('file', fileToUpload, fileToUpload.name);
     this.http
       .post(baseUrl + "files", formData)

       .subscribe();*/
  }
}
