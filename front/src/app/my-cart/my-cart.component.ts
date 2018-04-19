import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pluck, mergeMap, filter, flatMap, map, tap, delay } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { CartService } from '../cart.service';
import { ICartArticle } from '../../../../common/interface';
import { ShopService } from '../shop.service';
import { CartArticle } from '../cart-article';
import { Cart } from '../article';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  cartArticles$: Observable<CartArticle[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService, private shopService: ShopService) { }

  ngOnInit() {
    this.cartArticles$ = this.cartService.getMyCarts()
      .pipe(
        mergeMap(carts => Observable.from(carts)),
        filter(cart => cart.validated === false),
        pluck<Cart, CartArticle[]>('articles'),
        tap(console.log),
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
        })
      );

    this.total$ = this.cartArticles$.pipe(
      map(cartArticles => cartArticles.reduce((sum, cartArticle) => sum + (cartArticle.quantity * cartArticle.article.price), 0))
    );

  }

  delete(cartArticle: CartArticle) {
    this.cartService.deleteArticle(cartArticle.articleId, cartArticle.cartId).subscribe({
      error: e => console.error(e)
    });
  }

  more(cartArticle: CartArticle) {
    this.cartService.setQuantity(cartArticle.articleId, { quantity: cartArticle.quantity + 1 }, cartArticle.cartId)
      .subscribe({
        error: e => console.error(e)
      });
  }

  less(cartArticle: CartArticle) {
    if (cartArticle.quantity > 1) {
      this.cartService.setQuantity(cartArticle.articleId, { quantity: cartArticle.quantity - 1 }, cartArticle.cartId)
        .subscribe({
          error: e => console.error(e)
        });
    }
  }
}
