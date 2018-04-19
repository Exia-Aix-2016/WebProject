import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { pluck, mergeMap, filter, map } from 'rxjs/operators';
import { CartService } from '../cart.service';
import { ICartArticle } from '../../../../common/interface';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit {

  numberOfArticles$: Observable<number>;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.numberOfArticles$ = this.cartService.getMyCarts()
      .pipe(
        mergeMap(carts => Observable.from(carts)),
        filter(cart => cart.validated === false),
        pluck('articles'),
        map((articles: ICartArticle[]) => articles.length)
      );
  }

  goToCart() {
    this.router.navigateByUrl('/my-cart');
  }

}
