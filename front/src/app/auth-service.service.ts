import { Injectable } from '@angular/core';
import { LoginDto } from '../../../common/dto/';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs/"
import { catchError } from 'rxjs/operators';
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public connection(loginDto: LoginDto): Observable<{}> {
     return this.http
       .post(
         "http://localhost:3000/auth/token",
         JSON.stringify(loginDto),
         {
           headers: new HttpHeaders({ "Content-Type": "application/json" })
         }
       )
       .pipe(/*ERROR FUNCTION*/);
  }
}
