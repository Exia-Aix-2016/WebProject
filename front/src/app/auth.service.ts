import { Injectable } from '@angular/core';
import { LoginDto, CreateUserDto } from '../../../common/dto/';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { baseUrl } from './constants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IPayload, IRawPayload } from '../../../common/interface';

@Injectable()
export class AuthService {

  private $connection = new BehaviorSubject<IPayload>(undefined);
  private timeoutId;

  constructor(private http: HttpClient) {
    if (this.isAuthenticated()) {
      this.$connection.next(this.payload);
    }
  }

  public get token(): string {
    return localStorage.getItem('token');
  }

  public get payload(): IPayload {
    if (this.token) {
      const token: string = this.token;
      const { email, exp, firstname, groupName, iat, id, name }: IRawPayload = JSON.parse(window.atob(token.split('.')[1]));
      return { id, email, name, firstname, groupName, iat: new Date(iat * 1000), exp: new Date(exp * 1000) };
    }
    return undefined;
  }

  public get connection(): Observable<IPayload> {
    return this.$connection;
  }

  public isAuthenticated(): boolean {
    if (this.token) {
      return this.remainingTime > 0 ? true : false;
    }
    return false;
  }

  private get remainingTime() {
    return this.payload.exp.getTime() - Date.now();
  }

  public connect(loginDto: LoginDto): Observable<void> {
    return this.http
      .post<{ access_token: string; expires_in: number }>(
        baseUrl + 'auth/token',
        loginDto
      )
      .map(data => {
        localStorage.setItem('token', data.access_token);
        if (this.timeoutId !== undefined) {
          clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
          this.$connection.next(undefined);
        }, this.remainingTime);
        this.$connection.next(this.payload);
        return;
      });
  }

  public disconnect() {
    localStorage.removeItem('token');
    this.$connection.next(undefined);
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
