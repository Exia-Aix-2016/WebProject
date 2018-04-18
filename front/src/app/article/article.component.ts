import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { IArticle } from '../../../../common/interface';
import { ArticleMode } from '../article-mode.enum';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @HostBinding('class.card') isCard = true;
  @HostBinding('class.small-mode') isSmallMode = true;
  @HostBinding('class.large-mode') isLargeMode = false;
  @HostBinding('class.cart-mode') isCartMode = false;
  @Input() article: IArticle;
  @Input() mode: ArticleMode;

  constructor() { }

  ngOnInit() {
    this.isSmallMode = this.mode === ArticleMode.SMALL;
    this.isLargeMode = this.mode === ArticleMode.LARGE;
    this.isCartMode = this.mode === ArticleMode.CART;
  }

  buy() {
    console.log('buy');
  }
}
