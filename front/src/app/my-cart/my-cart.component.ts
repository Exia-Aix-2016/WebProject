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

  constructor(private cartService: CartService, private shopService: ShopService) { }

  ngOnInit() {
    this.cartArticles$ = this.cartService.getMyCarts()
      .pipe(
        mergeMap(carts => Observable.from(carts)),
        filter(cart => cart.validated === false),
        pluck<Cart, CartArticle[]>('articles'),
        flatMap(cartArticles =>
          forkJoin(cartArticles.map(cartArticle =>
            this.shopService.getArticle(cartArticle.articleId).pipe(
              map(article => {
                return { ...cartArticle, article };
              }),
            )
          ))
        ),
    );
  }

  delete(cartArticle: CartArticle) {
    console.log('deleting !');
    this.cartService.deleteArticle(cartArticle.articleId).subscribe({
      complete: () => console.log('deleted !'),
      error: e => console.error(e)
    });
  }

  more(cartArticle: CartArticle) {
    console.log('more', cartArticle);
  }

  less(cartArticle: CartArticle) {

  }
}
