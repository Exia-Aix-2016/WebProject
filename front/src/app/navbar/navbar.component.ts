import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { AuthService } from '../auth.service';
import { BsModalRef } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  modalRef: BsModalRef;
  public routes: Array<{ path: string, title: string, active: boolean, admin: boolean }> = [
    { path: '/activities', title: 'Activities', active: false, admin: false},
    { path: '/ideas', title: 'Suggestion Box', active: false, admin: false},
    { path: '/shop', title: 'Shop', active: false, admin: false },
    { path: '/users', title: 'Users', active: false, admin: true},
  ];

  public logins: Array<{ title: string, path: string }> = [
    { title: 'Login', path: '/login' },
    { title: 'Logout', path: '' }
  ];

  constructor(private route: ActivatedRoute, private authService: AuthService, private modalService: BsModalService) {
    this.route.url.subscribe(segments => {
      this.routes.forEach(route => {
        route.active = route.path.includes(segments[0].path) ? true : false;
      });
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  public get displayLogin() {
    return !this.authService.isAuthenticated();
  }

  public disconnect() {
    return this.authService.disconnect();
  }
}
