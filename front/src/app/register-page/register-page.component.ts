import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers: [AuthService],
})
export class RegisterPageComponent implements OnInit {

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
  }

  private name: string;
  private firstname: string;
  private email: string;
  private password: string;

  public signUp(): void{

    this.authService.register({
      name: this.name,
      firstname: this.firstname,
      email: this.email,
      password: this.password
    }).subscribe({
      complete: () => console.log('success !'),
      error: e => console.error(e),
    });

    
  }

}
