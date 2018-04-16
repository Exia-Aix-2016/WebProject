import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { LoginDto } from '../../../../common/dto';

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
  providers: [AuthService]
})
export class AuthFormComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private readonly authService: AuthService) {}

  public onSubmit(): void {


    let loginDto: LoginDto;
    loginDto = {email: this.email, password: this.password};
    console.log(loginDto);
   this.authService.connection({email: this.email, password: this.password});
  }

  ngOnInit() {}
}
