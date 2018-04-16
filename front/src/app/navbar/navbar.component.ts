import { Component } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {Observable} from "rxjs"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  public routes = [
    {path: "/activities", title: "Activities", active: false},
    {path: "/ideas", title: "Suggestion Box", active: false},
    {path: "/shop", title: "Shop", active: false},
  ]

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(segments => {
      this.routes.forEach(route => {
        route.active = route.path.includes(segments[0].path) ? true : false;
      })
    })
   }
}
