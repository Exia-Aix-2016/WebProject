import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { IArticle, ICategory } from '../../../common/interface';
import { baseUrl } from './constants';

@Injectable()
export class ShopService {

  private $update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  public getArticles(withCartArticles = false, category?: string) {
    if (category) {
      return this.$update.switchMapTo(this.http.get<IArticle[]>(baseUrl + 'articles', { params: { category } }));
    }
    return this.$update.switchMapTo(
      this.http.get<IArticle[]>(baseUrl + 'articles', { params: { withCartArticles: withCartArticles.toString() } })
    );
  }

  public getCategories() {
    return this.$update.switchMapTo(this.http.get<ICategory[]>(baseUrl + 'articles/categories'));
  }
}
