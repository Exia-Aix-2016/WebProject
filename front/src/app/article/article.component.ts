import { Component, OnInit, HostBinding, Input, TemplateRef } from '@angular/core';
import { IArticle } from '../../../../common/interface';
import { ArticleMode } from '../article-mode.enum';
import { ShopService } from '../shop.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

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
  modalRef: BsModalRef;

  constructor(private shopService: ShopService, private modalService: BsModalService) { }

  ngOnInit() {
    this.isSmallMode = this.mode === ArticleMode.SMALL;
    this.isLargeMode = this.mode === ArticleMode.LARGE;
    this.isCartMode = this.mode === ArticleMode.CART;
  }

  toggleSelling(event?: MouseEvent) {
    this.shopService.editArticle(this.article.id, { selling: !this.article.selling })
      .subscribe({
        error: e => console.error(e)
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  buy() {
    console.log('buy');
  }
}
