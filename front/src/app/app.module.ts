import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BsDropdownModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';



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
import { ShopPageComponent } from './shop-page/shop-page.component';
import { ShopService } from './shop.service';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ActivityManagerComponent } from './activity-manager/activity-manager.component';
import { UploadFileService } from './upload-file.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: RegisterPageComponent },
  { path: 'activities', component: ActivitiesPageComponent },
  { path: 'ideas', component: ActivitiesPageComponent },
  { path: 'shop', component: ShopPageComponent },
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
    ActivityManagerComponent,
    IsConnectedComponent,
    ShopPageComponent,
    ArticleComponent,
    ArticlesComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularSvgIconModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    AuthService,
    ActivityService,
    ShopService,
    UploadFileService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
