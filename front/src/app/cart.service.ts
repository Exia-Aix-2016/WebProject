import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ICartArticle, ICart } from '../../../common/interface';
import { baseUrl } from './constants';
import { HttpClient } from '@angular/common/http';
import { Cart } from './article';
import { switchMapTo, flatMap, map } from 'rxjs/operators';

@Injectable()
export class CartService {

  private $update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  public getMyCarts(): Observable<Cart[]> {
    const url = baseUrl + 'carts';
    return this.$update.pipe(
      switchMapTo(this.http.get<ICart[]>(url)),
      flatMap(carts => Observable.forkJoin(
        carts.map(cart => this.getArticles(cart.id).pipe(
          map(articles => {
            return { ...cart, articles };
          })
        ))
      ))
    );

  }

  public getAll() {
    const url = baseUrl + 'carts/all';
    return this.$update.switchMapTo(this.http.get<ICart[]>(url));
  }

  public getArticles(cartId: number) {
    const url = `${baseUrl}carts/${cartId}/articles`;
    return this.http.get<ICartArticle[]>(url);
  }

}
