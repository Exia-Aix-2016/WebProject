import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ShopService } from '../shop.service';
import { ICategory } from '../../../../common/interface';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {

  $categories: Observable<ICategory[]>;
  selectedCategory = 'all';
  sortBy = 'name';
  sort: 'ASC' | 'DSC' = 'ASC';
  modalRef: BsModalRef;

  constructor(private shopService: ShopService, private modalService: BsModalService) { }

  ngOnInit() {
    this.$categories = this.shopService.getCategories();
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }

  setSortBy(sortBy: string) {
    this.sortBy = sortBy;
  }

  setSort(sort: 'ASC' | 'DSC') {
    this.sort = sort;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
