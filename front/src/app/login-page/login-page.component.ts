import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [AuthService],
})
export class LoginPageComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private readonly authService: AuthService, private router: Router) { }

  ngOnInit() { }

  public onSubmit(): void {
    this.authService
      .connection({ email: this.email, password: this.password })
      .subscribe({
        complete: () => console.log('success !'),
        error: e => console.error(e),
      });
  }
}
