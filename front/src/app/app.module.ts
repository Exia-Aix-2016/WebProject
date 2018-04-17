import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BsDropdownModule } from "ngx-bootstrap";



import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { ActivityService } from './activity.service';
import { TokenInterceptor } from './token.interceptor';
import { LoginPageComponent } from './login-page/login-page.component';
import { ActivitiesPageComponent } from './activities-page/activities-page.component';
import { ActivityComponent } from './activity/activity.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { CreateIdeaPageComponent } from './create-idea-page/create-idea-page.component';
import { UploadFileService } from './upload-file.service';

const appRoutes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "signup", component: RegisterPageComponent },
  { path: "activities", component: ActivitiesPageComponent },
  { path: "ideas", component: ActivitiesPageComponent },
  { path: "addIdea", component: CreateIdeaPageComponent },
  { path: "**", redirectTo: "/activities" }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ActivitiesPageComponent,
    ActivityComponent,
    NavbarComponent,
    RegisterPageComponent,
    ActivitiesListComponent,
    CreateIdeaPageComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularSvgIconModule,
  ],
  providers: [
    AuthService,
    ActivityService,
    UploadFileService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
