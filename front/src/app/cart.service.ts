import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ICartArticle, ICart } from '../../../common/interface';
import { baseUrl } from './constants';
import { HttpClient } from '@angular/common/http';
import { Cart } from './article';
import { switchMapTo, flatMap, map, tap, mergeMap, filter, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SetQuantityInCartDto, CartStateDto } from '../../../common/dto';

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

  public getAll(): Observable<ICart[]> {
    const url = baseUrl + 'carts/all';
    return this.$update.switchMapTo(this.http.get<ICart[]>(url));
  }

  public getArticles(cartId: number) {
    const url = `${baseUrl}carts/${cartId}/articles`;
    return this.http.get<ICartArticle[]>(url);
  }

  public getMyDefaultCart(): Observable<Cart> {
    return this.getMyCarts()
      .pipe(
        mergeMap(carts => Observable.from(carts)),
        filter(cart => cart.validated === false),
    );
  }

  public deleteArticle(articleId: number, cartId?: number) {
    const url$ = cartId != null
      ? of(`${baseUrl}carts/${cartId}/articles/${articleId}`)
      : this.getMyDefaultCart().pipe(map(cart => `${baseUrl}carts/${cart.id}/articles/${articleId}`));

    return url$.pipe(
      take(1),
      switchMap(url => this.http.delete<void>(url)),
      tap(() => this.$update.next(true)),
    );
  }

  public addArticle(articleId: number, cartId?: number) {
    const url$ = cartId != null
      ? of(`${baseUrl}carts/${cartId}/articles`)
      : this.getMyDefaultCart().pipe(map(cart => `${baseUrl}carts/${cart.id}/articles`));

    return url$.pipe(
      take(1),
      switchMap(url => this.http.post<void>(url, { articleId, quantity: 1 })),
      tap(() => this.$update.next(true)),
    );
  }

  public setQuantity(articleId: number, setQuantityInCartDto: SetQuantityInCartDto, cartId?: number) {
    const url$ = cartId != null
      ? of(`${baseUrl}carts/${cartId}/articles/${articleId}`)
      : this.getMyDefaultCart().pipe(map(cart => `${baseUrl}carts/${cart.id}/articles/${articleId}`));

    return url$.pipe(
      take(1),
      switchMap(url => this.http.put<void>(url, setQuantityInCartDto)),
      tap(() => this.$update.next(true)),
    );
  }

  public edit(cartId: number, cartStateDto: CartStateDto) {
    const url = `${baseUrl}carts/${cartId}`;
    return this.http.put(url, cartStateDto).do(() => this.$update.next(true));
  }
}
