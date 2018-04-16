import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ButtonsModule } from "ngx-bootstrap";

import { AppComponent } from "./app.component";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { AuthService } from "./auth.service";
import { FormsModule } from "@angular/forms";
import { TokenInterceptor } from "./token.interceptor";
import { LoginPageComponent } from "./login-page/login-page.component";

const appRoutes: Routes = [{ path: "login", component: LoginPageComponent }];

@NgModule({
  declarations: [AppComponent, AuthFormComponent, LoginPageComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ButtonsModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
