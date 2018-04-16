import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ButtonsModule } from "ngx-bootstrap";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { AuthService } from "./auth.service";
import { FormsModule } from "@angular/forms";
import { TokenInterceptor } from "./token.interceptor";

@NgModule({
  declarations: [AppComponent, AuthFormComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ButtonsModule.forRoot(),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
