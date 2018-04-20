import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { flatMap, map, tap, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { ShopService } from '../shop.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  carts$: Observable<Cart[]>;
  orders$: Observable<Cart[]>;
  finished$: Observable<Cart[]>;

  constructor(private cartService: CartService, private shopService: ShopService, private userService: UserService) { }

  ngOnInit() {
    this.carts$ = this.cartService.getAll().pipe(
      flatMap(carts => {
        return carts.length === 0
          ? of([])
          : forkJoin(carts.map(cart =>
            this.cartService.getArticles(cart.id).pipe(
              flatMap(cartArticles => {
                return cartArticles.length === 0
                  ? of(cartArticles)
                  : forkJoin(cartArticles.map(cartArticle =>
                    this.shopService.getArticle(cartArticle.articleId).pipe(
                      map(article => {
                        return { ...cartArticle, article };
                      }),
                    )
                  ));
              }),
              map(cartArticles => {
                return { ...cart, cartArticles };
              }),
            )
          ));
      }),
      flatMap(carts => {
        return carts.length === 0
          ? of([])
          : forkJoin(carts.map(cart =>
            this.userService.getUser(cart.userId).pipe(
              take(1),
              map(user => {
                return { ...cart, user };
              }),
            )
          ));
      }),
      map(carts => carts.map(cart => {
        return { ...cart, isCollapsed: true };
      }))
    );

    this.orders$ = this.carts$.pipe(
      map(carts => carts.filter(cart => cart.delivered === false && cart.validated === true))
    );

    this.finished$ = this.carts$.pipe(
      map(carts => carts.filter(cart => cart.delivered === true && cart.validated === true))
    );

  }

  toggleCollapse(cart: Cart) {
    cart.isCollapsed = !cart.isCollapsed;
  }

  deliver(event: MouseEvent, cart: Cart) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.edit(cart.id, { delivered: true }).subscribe({
      error: console.error,
    });
  }
}
