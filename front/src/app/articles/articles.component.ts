import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShopService } from '../shop.service';
import { IArticle } from '../../../../common/interface';
import { ArticleMode } from '../article-mode.enum';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnChanges {

  @Input() category: string;
  @Input() sortBy: string;
  @Input() sort: 'ASC' | 'DSC';
  articleMode = ArticleMode.SMALL;

  public $articles: Observable<IArticle[]>;

  constructor(private shopService: ShopService) { }

  ngOnInit() { }

  ngOnChanges() {
    let $c: Observable<IArticle[]>;
    if (this.category === 'all') {
      $c = this.shopService.getArticles();
    } else if (this.category === 'bestsellers') {
      $c = this.shopService.getArticles(true)
        .map(articles => {
          return articles.sort((a, b) => b.cartArticles.length - a.cartArticles.length).slice(0, 3);
        });
    } else {
      $c = this.shopService.getArticles(false, this.category);
    }
    this.$articles = $c.map(articles => {
      return articles.sort((a, b) => {
        let res = 0;
        if (this.sortBy === 'name') {
          res = a.name.localeCompare(b.name);
        } else if (this.sortBy === 'price') {
          res = a.price - b.price;
        }

        return this.sort === 'ASC' ? res : - res;
      });
    });
  }

}
