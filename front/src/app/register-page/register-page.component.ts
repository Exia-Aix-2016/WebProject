import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {

  name: string;
  firstname: string;
  email: string;
  password: string;

  constructor(private readonly authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public signUp(): void {

    this.authService.register({
      name: this.name,
      firstname: this.firstname,
      email: this.email,
      password: this.password
    }).subscribe({
      complete: () => {
        this.router.navigateByUrl('/login');

      },
      error: e => console.error(e),
    });


  }

}
