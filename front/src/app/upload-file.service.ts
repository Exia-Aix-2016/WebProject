import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { baseUrl } from "./constants";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class UploadFileService {
  constructor(private http: HttpClient) {}

  public uploadFile(formData: FormData): Observable<{}> {


    let headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post(baseUrl + 'files', formData, {headers: headers})
    .map(res => {return <object>res})
    .catch(error => Observable.throw(error))




  }
}
