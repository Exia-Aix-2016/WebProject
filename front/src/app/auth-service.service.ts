import { Injectable } from '@angular/core';
import { LoginDto } from '../../../common/dto/';

@Injectable()
export class AuthService {

  private url = 'localhost:3000/auth/';
  constructor() { }


  public async connection(loginDto: LoginDto): Promise<void>{
    
      //FETCHING DATA
      fetch("http://localhost:3000/auth/token", {
        method: "POST",
        body: JSON.stringify(loginDto),
        mode: "no-cors"
      })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          alert(JSON.stringify(data));
        });

  }
}
