import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { LoginDto } from "../../../../common/dto";

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
  providers: [AuthService],
})
export class AuthFormComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private readonly authService: AuthService) {}

  public onSubmit(): void {
    this.authService
      .connection({ email: this.email, password: this.password })
      .subscribe({
        complete: () => console.log("success !"),
        error: e => console.error(e),
      });
  }

  ngOnInit() {}
}
