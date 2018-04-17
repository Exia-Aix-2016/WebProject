import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  public routes: Array<{ path: string, title: string, active: boolean }> = [
    { path: '/activities', title: 'Activities', active: false },
    { path: '/ideas', title: 'Suggestion Box', active: false },
    { path: '/shop', title: 'Shop', active: false },
  ];

  public logins: Array<{title: string, path: string}> = [
    { title: "Login", path: "/login"},
    { title: "Logout", path: "" }
  ]

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.url.subscribe(segments => {
      this.routes.forEach(route => {
        route.active = route.path.includes(segments[0].path) ? true : false;
      });
    });
  }

  public get displayLogin(){
    return !this.authService.isAuthenticated();
  }

  public disconnect(){
    return this.authService.disconnection();
  }
}