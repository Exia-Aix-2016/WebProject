import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IArticle, ICategory } from '../../../common/interface';
import { baseUrl } from './constants';
import { EditArticleDto, CreateArticleDto } from '../../../common/dto';

@Injectable()
export class ShopService {

  private $update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  public forceUpdate() {
    this.$update.next(true);
  }

  public getArticles(withCartArticles = false, category?: string) {
    return this.$update.switchMap(() => {
      return category
        ? this.http.get<IArticle[]>(baseUrl + 'articles', { params: { category } })
        : this.http.get<IArticle[]>(baseUrl + 'articles', { params: { withCartArticles: withCartArticles.toString() } });
    });
  }

  public getArticle(articleId: number): Observable<IArticle> {
    const url = `${baseUrl}articles/${articleId}`;
    return this.http.get<IArticle>(url);
  }

  public getCategories() {
    return this.$update.switchMapTo(this.http.get<ICategory[]>(baseUrl + 'articles/categories'));
  }

  public editArticle(articleId: number, editArticleDto: EditArticleDto): Observable<void> {
    return this.http.put<void>(`${baseUrl}articles/${articleId}`, editArticleDto)
      .do(v => this.$update.next(true));
  }

  public createArticle(createArticleDto: CreateArticleDto): Observable<IArticle> {
    return this.http.post<IArticle>(`${baseUrl}articles`, createArticleDto)
      .do(v => this.$update.next(true));
  }
}
