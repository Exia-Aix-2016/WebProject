import { Injectable } from '@angular/core';
import { LoginDto, CreateUserDto } from '../../../common/dto/';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { baseUrl } from './constants';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return token ? true : false;
  }

  public connection(loginDto: LoginDto): Observable<boolean> {
    return this.http
      .post<{ access_token: string; expires_in: number }>(
        baseUrl + 'auth/token',
        loginDto
      )
      .map(data => {
        localStorage.setItem('token', data.access_token);
        return true;
      });
  }

  public disconnection(){
    localStorage.removeItem("token");
  }
  public register(createUserDto: CreateUserDto): Observable<boolean> {


    return this.http
      .post(
        baseUrl + 'users/',
        createUserDto
      )
      .map(data => {
        return true;
      });

    }
}
