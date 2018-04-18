import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { baseUrl } from './constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class UploadFileService {
  constructor(private http: HttpClient) { }

  public uploadFile(formData: FormData): Observable<{ imgUrl: string }> {


    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post<{ imgUrl: string }>(baseUrl + 'files', formData, { headers: headers });
  }
}
