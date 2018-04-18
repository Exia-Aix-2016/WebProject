import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BsDropdownModule, CarouselModule } from "ngx-bootstrap";


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
import { IsConnectedComponent } from './is-connected/is-connected.component';
import { SocialPageComponent } from './social-page/social-page.component';
import { SocialService } from './social.service';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: RegisterPageComponent},
  { path: 'activities', component: ActivitiesPageComponent },
  { path: 'ideas', component: ActivitiesPageComponent },
  { path: 'activities/:id', component: SocialPageComponent },
  { path: '**', redirectTo: '/activities' },
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
    IsConnectedComponent,
    SocialPageComponent,
    CommentComponent,
    CommentListComponent,
    PictureListComponent,
    CommentFormComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularSvgIconModule,
  ],
  providers: [
    AuthService,
    ActivityService,
    SocialService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
