import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ButtonsModule } from "ngx-bootstrap";

import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthService } from "./auth-service.service";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, AuthFormComponent],
  imports: [ HttpClientModule, FormsModule, BrowserModule, ButtonsModule.forRoot()],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
