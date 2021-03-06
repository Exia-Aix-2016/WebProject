import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, CollapseModule } from 'ngx-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BsDropdownModule, ModalModule, BsDatepickerModule, CarouselModule, PaginationModule } from 'ngx-bootstrap';

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
import { ShopPageComponent } from './shop-page/shop-page.component';
import { ShopService } from './shop.service';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ActivityManagerComponent } from './activity-manager/activity-manager.component';
import { UploadFileService } from './upload-file.service';
import { ArticleManagerComponent } from './article-manager/article-manager.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { CartService } from './cart.service';
import { UserService } from './user.service';
import { OrdersPageComponent } from './orders-page/orders-page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: RegisterPageComponent },
  { path: 'activities', component: ActivitiesPageComponent },
  { path: 'ideas', component: ActivitiesPageComponent },
  { path: 'activities/:id', component: SocialPageComponent },
  { path: 'shop', component: ShopPageComponent },
  { path: 'my-cart', component: MyCartComponent },
  { path: 'users', component: UsersPageComponent },
  { path: 'orders', component: OrdersPageComponent },
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
    SocialPageComponent,
    CommentComponent,
    CommentListComponent,
    PictureListComponent,
    CommentFormComponent,
    ShopPageComponent,
    ArticleComponent,
    ArticlesComponent,
    ArticleManagerComponent,
    UsersPageComponent,
    UsersListComponent,
    UserComponent,
    MyCartComponent,
    CartButtonComponent,
    OrdersPageComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularSvgIconModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  providers: [
    AuthService,
    ActivityService,
    SocialService,
    ShopService,
    UploadFileService,
    CartService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
